import { AbstractError } from "App/Core/errors/error.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import User from "App/Models/User";
import {
	IScheduleBlock,
	Prof,
	ScheduleBlockParams,
} from "Types/IScheduleBlock";
import { IUser } from "Types/IUser";
import { isAfter, startOfYesterday } from "date-fns";
import * as z from "zod";
import { Entity } from "../abstract/entity.abstract";

export class ScheduleBlockEntity extends Entity implements IScheduleBlock {
	_prof: Prof;
	_date: Date;
	_hour_start: string;
	_hour_end: string;
	_all_day: boolean;
	_unity_id: string;
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

			z.object({
				profId: z.string(),
				date: z
					.string()
					.refine((val) =>
						isAfter(new Date(val), startOfYesterday())
					),
				hourStart: z.string(),
				hourEnd: z.string(),
				allDay: z.boolean()
			}).parse(params);

			const prof = {
				value: params.profId,
				label: profData.name,
			};

			return right(
				new ScheduleBlockEntity()
					.defineDate(new Date(params.date))
					.defineHourStart(params.hourStart)
					.defineAllDay(params.allDay)
					.defineHourEnd(params.hourEnd)
					.defineProf(prof)
			);
		} catch (err) {
			return left(err);
		}
	}
}
