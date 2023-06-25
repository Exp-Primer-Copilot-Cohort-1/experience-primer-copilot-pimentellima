import { AbstractError } from "App/Core/errors/error.interface";
import * as z from "zod";
import { PromiseEither, left, right } from "App/Core/shared";
import {
	IScheduleBlock,
	Prof,
	ScheduleBlockParams,
} from "Types/IScheduleBlock";
import { format, isAfter, startOfYesterday } from "date-fns";
import { Entity } from "../abstract/entity.abstract";

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
			const parsedParams = z
				.object({
					prof: z.object({
						value: z.string(),
						label: z.string(),
					}),
					date: z
						.string()
						.refine((val) => {
							const yesterday = startOfYesterday();
							return isAfter(new Date(val), yesterday);
						})
						.transform((val) => new Date(val)),
					hour_start: z
						.string()
						.refine(
							(val) =>
								format(new Date(val), "HH:mm") <
								format(new Date(params.hour_end), "HH:mm")
						)
						.transform((val) => {
							const correctedVal = new Date(val);
							const date = new Date(params.date);
							correctedVal.setFullYear(
								date.getFullYear(),
								date.getMonth(),
								date.getDate()
							);
							return correctedVal.toISOString();
						}),
					hour_end: z.string().transform((val) => {
						const correctedVal = new Date(val);
						const date = new Date(params.date);
						correctedVal.setFullYear(
							date.getFullYear(),
							date.getMonth(),
							date.getDate()
						);
						return correctedVal.toISOString();
					}),
					all_day: z.boolean(),
					obs: z.string().optional(),
				})
				.parse(params);
			return right(
				new ScheduleBlockEntity()
					.defineProf(parsedParams.prof)
					.defineDate(parsedParams.date)
					.defineHourStart(parsedParams.hour_start)
					.defineHourEnd(parsedParams.hour_end)
					.defineAllDay(parsedParams.all_day)
					.defineObs(parsedParams.obs)
			);
		} catch (err) {
			return left(err);
		}
	}
}
