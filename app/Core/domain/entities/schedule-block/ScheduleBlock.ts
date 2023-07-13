import { AbstractError } from "App/Core/errors/error.interface";
import * as z from "zod";
import { PromiseEither, left, right } from "App/Core/shared";
import {
	IScheduleBlock,
	Prof,
	ScheduleBlockParams,
} from "Types/IScheduleBlock";
import { format, getDay, isAfter, isBefore, isSameDay, startOfYesterday } from "date-fns";
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
						const weekDay = getDay(new Date(val));
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
						if (
							isAfter(new Date(val), new Date(hour_start)) &&
							isBefore(new Date(val), new Date(hour_end))
						)
							return false;
						else return true;
					}
				}),
				hourEnd: z.string().refine((val) => {
					for (const { hour_end, hour_start } of profSchedule) {
						if (
							isAfter(new Date(val), new Date(hour_start)) &&
							isBefore(new Date(val), new Date(hour_end))
						)
							return false;
						else return true;
					}
				}),
			}).parse(params);

			const prof = {
				value: params.profId,
				label: profData.name,
			};


			return right(
				new ScheduleBlockEntity()
					.defineProf(prof)
					.defineDate(new Date(params.date))
					.defineHourStart(params.hourStart)
					.defineHourEnd(params.hourEnd)
					.defineAllDay(params.allDay)
			);
		} catch (err) {
			return left(err);
		}
	}
}
