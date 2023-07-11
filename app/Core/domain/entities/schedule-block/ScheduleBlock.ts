import { AbstractError } from "App/Core/errors/error.interface";
import * as z from "zod";
import { PromiseEither, left, right } from "App/Core/shared";
import {
	IScheduleBlock,
	Prof,
	ScheduleBlockParams,
} from "Types/IScheduleBlock";
import { format, getDay, isAfter, isSameDay, startOfYesterday } from "date-fns";
import { Entity } from "../abstract/entity.abstract";
import User from "App/Models/User";
import { IUser } from "Types/IUser";
import Activity from "App/Models/Activity";
import { IActivity } from "Types/IActivity";
import ScheduleBlock from "App/Models/ScheduleBlock";
import Client from "App/Models/Client";

export class ScheduleBlockEntity extends Entity implements IScheduleBlock {
	_prof: Prof;
	_date: Date;
	_hour_start: string;
	_hour_end: string;
	_all_day: boolean;
	_unity_id: string
	_obs?: string | undefined;

	public get prof(): Prof {
		return this._prof;
	}

	public get date(): Date {
		return this._date;
	}

	public get hour_start(): string {
		return this._hour_start;
	}

	public get hour_end(): string {
		return this._hour_end;
	}

	public get unity_id(): string {
		return this._unity_id;
	}

	public get all_day(): boolean {
		return this._all_day;
	}

	public get obs(): string | undefined {
		return this._obs;
	}

	public defineProf(prof: Prof): this {
		this._prof = prof;
		return this;
	}

	public defineDate(date: Date): this {
		this._date = date;
		return this;
	}

	public defineHourStart(hourStart: string): this {
		this._hour_start = hourStart;
		return this;
	}

	public defineHourEnd(hourEnd: string): this {
		this._hour_end = hourEnd;
		return this;
	}

	public defineUnityId(unityId: string): this {
		this._unity_id = unityId;
		return this;
	}

	public defineAllDay(allDay: boolean): this {
		this._all_day = allDay;
		return this;
	}

	public defineObs(obs?: string | undefined): this {
		this._obs = obs;
		return this;
	}

	public static async build(
		params: ScheduleBlockParams
	): PromiseEither<AbstractError, ScheduleBlockEntity> {
		try {
			const profData = (await User.findById(params.profId)) as IUser;
			if (!profData)
				return left(new AbstractError("Could not find prof", 404));

			const activities = (await Activity.find({
				prof_id: params.profId,
			})) as IActivity[];

			const scheduleBlocks = (await ScheduleBlock.find({
				"prof.value": params.profId,
			})) as IScheduleBlock[];
			
			const [year, month, day] = params.date
				.split("-")
				.map((i) => parseInt(i));
			const dateVal = new Date(year, month - 1, day);
			
			const profSchedule = [
				...activities,
				...scheduleBlocks,
			].filter(({ date }) => {
				return isSameDay(dateVal, new Date(date));
			});

			z.object({
				profId: z.string(),
				date: z
					.string()
					.refine((val) => isAfter(new Date(val), startOfYesterday()))
					.refine((val) => {
						const weekDay = getDay(dateVal);
						if (
							(weekDay === 0 && !profData.is_sunday) ||
							(weekDay === 1 && !profData.is_monday) ||
							(weekDay === 2 && !profData.is_tuesday) ||
							(weekDay === 3 && !profData.is_thursday) ||
							(weekDay === 4 && !profData.is_wednesday) ||
							(weekDay === 5 && !profData.is_friday) ||
							(weekDay === 6 && !profData.is_saturday)
						) {
							return false;
						}
						return true;
					}),
				hourStart: z.string().refine((val) => {
					for (const { hour_end, hour_start } of profSchedule) {
						const formattedHourStart = format(
							new Date(hour_start),
							"HH:mm"
						);
						const formattedHourEnd = format(
							new Date(hour_end),
							"HH:mm"
						);
						if (
							val >= formattedHourStart &&
							val <= formattedHourEnd
						)
							return false;
					}
					return true;
				}),
				hourEnd: z.string().refine((val) => {
					for (const { hour_end, hour_start } of profSchedule) {
						const formattedHourStart = format(
							new Date(hour_start),
							"HH:mm"
						);
						const formattedHourEnd = format(
							new Date(hour_end),
							"HH:mm"
						);
						if (
							val >= formattedHourStart &&
							val <= formattedHourEnd
						)
							return false;
					}
					return true;
				}),
			}).parse(params);

			let [hh, mm] = params.hourStart.split(":").map((i) => parseInt(i));

			const hourStartDate = new Date(dateVal);
			hourStartDate.setHours(hh);
			hourStartDate.setMinutes(mm);
			const hour_start = hourStartDate.toISOString();

			[hh, mm] = params.hourEnd.split(":").map((i) => parseInt(i));
			const hourEndDate = new Date(dateVal);
			hourEndDate.setHours(hh);
			hourEndDate.setMinutes(mm);
			const hour_end = hourEndDate.toISOString();

			const prof = {
				value: params.profId,
				label: profData.name,
			};


			return right(
				new ScheduleBlockEntity()
					.defineProf(prof)
					.defineDate(dateVal)
					.defineHourStart(hour_start)
					.defineHourEnd(hour_end)
					.defineAllDay(params.allDay)
			);
		} catch (err) {
			return left(err);
		}
	}
}
