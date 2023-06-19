/* eslint-disable @typescript-eslint/naming-convention */
import { AbstractError } from "App/Core/errors/error.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import { AppointmentStatus } from "App/Helpers";
import User from "App/Models/User";
import { IActivity } from "Types/IActivity";
import { IUser } from "Types/IUser";
import { format, getDay, isAfter, startOfYesterday } from "date-fns";
import { z } from "zod";
import { AbstractActivity } from "../abstract/activity-abstract";

export class ActivityEntity extends AbstractActivity implements IActivity {
	private _date: Date;
	private _hour_start: string;
	private _hour_end: string;
	private _schedule_block: boolean;
	private _all_day: boolean;
	private _is_recorrent: boolean;
	private _scheduled: AppointmentStatus;
	private _started_at?: Date;
	private _finished_at?: Date;

	public get started_at(): Date | undefined {
		return this._started_at;
	}

	public get finished_at(): Date | undefined{
		return this._finished_at;
	}

	defineStartedAt(started_at: Date | undefined) {
		this._started_at = started_at;
		return this;
	}

	defineFinishedAt(finished_at: Date | undefined) {
		this._finished_at = finished_at;
		return this;
	}

	private constructor() {
		super();
	}

	public get is_recorrent(): boolean {
		return this._is_recorrent;
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

	public get schedule_block(): boolean {
		return this._schedule_block;
	}

	public get all_day(): boolean {
		return this._all_day;
	}

	public get is_recurrent(): boolean {
		return this._is_recorrent;
	}

	public get scheduled(): AppointmentStatus {
		return this._scheduled;
	}

	defineisRecorrent(is_recorrent: boolean): this {
		this._is_recorrent = is_recorrent;
		return this;
	}

	defineDate(date: Date): this {
		this._date = date;
		return this;
	}
	defineHourStart(date: string): this {
		this._hour_start = date;
		return this;
	}
	defineHourEnd(date: string): this {
		this._hour_end = date;
		return this;
	}
	defineScheduleBlock(schedule_block: boolean): this {
		this._schedule_block = schedule_block;
		return this;
	}
	defineAllDay(all_day: boolean): this {
		this._all_day = all_day;
		return this;
	}
	defineIsRecorrent(is_recorrent: boolean): this {
		this._is_recorrent = is_recorrent;
		return this;
	}
	defineScheduled(scheduled: AppointmentStatus): this {
		this._scheduled = scheduled;
		return this;
	}

	public static async build(
		params: IActivity
	): PromiseEither<AbstractError, ActivityEntity> {
		try {
			const profData = await User.findById(params.prof_id) as IUser
			const startLunch = format(
				new Date(profData.hour_start_lunch),
				"HH:mm"
			);
			const endLunch = format(
				new Date(profData.hour_end_lunch),
				"HH:mm"
			);
			const startDay = format(new Date(profData.hour_start), "HH:mm");
			const endDay = format(new Date(profData.hour_end), "HH:mm");

			z.object({
				prof: z.object({}),
				client: z.object({}),
				procedures: z
					.array(
						z.object({
							value: z.string(),
							health_insurance: z.object({
								value: z.string(),
								price: z.number(),
								label: z.string(),
							}),
							val: z.number(),
							minutes: z.number(),
							label: z.string(),
						})
					).min(1),
				date: z
					.string()
					.refine(
						(val) => {
							const yesterday = startOfYesterday();
							return isAfter(new Date(val), yesterday);
						},
					)
					.refine(
						(val) => {
							const day = getDay(new Date(val));
							if (
								(day === 0 && !profData.is_sunday) ||
								(day === 1 && !profData.is_monday) ||
								(day === 2 && !profData.is_tuesday) ||
								(day === 3 && !profData.is_thursday) ||
								(day === 4 && !profData.is_wednesday) ||
								(day === 5 && !profData.is_friday) ||
								(day === 6 && !profData.is_saturday)
							) {
								return false;
							}
							return true;
						},
						{ message: "O profissional selecionado não atende nesse dia" }
					),
				hour_start: z 
					.string()
					.refine(
						(val) => {
							const formattedVal = format(new Date(val), "HH:mm");
							if (
								(formattedVal >= startLunch && formattedVal <= endLunch) ||
								formattedVal < startDay ||
								formattedVal > endDay
							) {
								return false;
							}
							return true;
						},
						{ message: "O profissional selecionado não atende nesse horário" }
					)
					.refine(
						(val) => {
							const hour_end = params.hour_end;
							if (!hour_end || !val) {
								return true;
							}
							return (
								format(new Date(val), "HH:mm") <
								format(new Date(hour_end), "HH:mm")
							);
						},
					),
				hour_end: z
					.string()
					.refine(
						(val) => {
							const formattedVal = format(new Date(val), "HH:mm");
							if (
								(formattedVal >= startLunch && formattedVal <= endLunch) ||
								formattedVal < startDay ||
								formattedVal > endDay
							) {
								return false;
							}
							return true;
						},
						{ message: "O profissional selecionado não atende nesse horário" }
					),
				obs: z.string(),
			}).parse(params)

			const hour_start = new Date(params.hour_start);
			const hour_end = new Date(params.hour_end);

			hour_start.setFullYear(
				new Date(params.date).getFullYear(),
				new Date(params.date).getMonth(),
				new Date(params.date).getDate()
			);
			hour_end.setFullYear(
				new Date(params.date).getFullYear(),
				new Date(params.date).getMonth(),
				new Date(params.date).getDate()
			);

			return right(
				new ActivityEntity()
					.defineId(params._id?.toString())
					.defineDate(params.date)
					.defineHourStart(hour_start.toISOString())
					.defineHourEnd(hour_end.toISOString())
					.defineStatus(params.status)
					.defineScheduleBlock(params.schedule_block)
					.defineProcedures(params.procedures)
					.defineClient(params.client)
					.defineObs(params.obs)
					.defineProf(params.prof)
					.defineAllDay(params.all_day)
					.defineIsRecorrent(params.is_recorrent)
					.defineActive(params.active)
					.defineUnityId(params.unity_id.toString())
					.defineScheduled(params.scheduled)
					.defineProfId(params.prof_id?.toString())
					.defineStartedAt(params.started_at)
					.defineFinishedAt(params.finished_at)
			);
		} catch (err) {
			console.log(err)
			return left(err);
		}
	}
}

export default ActivityEntity;
