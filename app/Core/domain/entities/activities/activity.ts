/* eslint-disable @typescript-eslint/naming-convention */
import { AbstractError } from "App/Core/errors/error.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import { AppointmentStatus, PaymentStatus } from "App/Helpers";
import Activity from "App/Models/Activity";
import User from "App/Models/User";
import { ActivityParams, IActivity } from "Types/IActivity";
import { IUser } from "Types/IUser";
import { format, getDay, isAfter, isSameDay, startOfYesterday } from "date-fns";
import { z } from "zod";
import { AbstractActivity } from "../abstract/activity-abstract";
import ScheduleBlock from "App/Models/ScheduleBlock";
import { IScheduleBlock } from "Types/IScheduleBlock";

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

	public get finished_at(): Date | undefined {
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
		params: ActivityParams
	): PromiseEither<AbstractError, ActivityEntity> {
		try {

			const profData = (await User.findById(params.prof_id)) as IUser;
			const activities = (
				(await Activity.find({
					prof_id: params.prof_id,
				})) as IActivity[]
			).filter(
				(activity) =>
					isSameDay(activity.date, new Date(params.date)) &&
					activity._id !== params._id
			);
			const scheduleBlocks = (
				(await ScheduleBlock.find({
					"prof.value": params.prof_id,
				})) as IScheduleBlock[]
			).filter((scheduleBlock) =>
				isSameDay(scheduleBlock.date, new Date(params.date))
			);

			const profSchedule = [...activities, ...scheduleBlocks];

			const startLunch = format(
				new Date(profData.hour_start_lunch),
				"HH:mm"
			);
			const endLunch = format(new Date(profData.hour_end_lunch), "HH:mm");
			const startDay = format(new Date(profData.hour_start), "HH:mm");
			const endDay = format(new Date(profData.hour_end), "HH:mm");
			const parsedParams = z
				.object({
					prof: z.object({
						value: z.string(),
						label: z.string(),
					}),
					prof_id: z.string(),
					client: z.object({
						value: z.string(),
						label: z.string(),
						celphone: z.string(),
						email: z.string().optional(),
						partner: z.string().nullable().optional(),
					}),
					procedures: z.array(
						z
							.object({
								value: z.string(),
								health_insurance: z.object({
									value: z.string(),
									price: z.number(),
									label: z.string(),
								}),
								val: z.number(),
								minutes: z.number(),
								label: z.string(),
								color: z.string(),
							})
							.transform((val) => ({
								...val,
								status: "A RECEBER",
							}))
					),
					date: z
						.string()
						.refine((val) => {
							const yesterday = startOfYesterday();
							return isAfter(new Date(val), yesterday);
						})
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
							{
								message:
									"O profissional selecionado não atende nesse dia",
							}
						)
						.transform((val) => new Date(val)),
					hour_start: z
						.string()
						.refine(
							(val) => {
								const formattedVal = format(
									new Date(val),
									"HH:mm"
								);
								if (
									(formattedVal >= startLunch &&
										formattedVal <= endLunch) ||
									formattedVal < startDay ||
									formattedVal > endDay
								) {
									return false;
								}
								return true;
							},
							{
								message:
									"O profissional selecionado não atende nesse horário",
							}
						)
						.refine(
							(val) => {
								for (const activity of profSchedule) {
									const formattedVal = format(
										new Date(val),
										"HH:mm"
									);
									const formattedHourStart = format(
										new Date(activity.hour_start),
										"HH:mm"
									);
									const formattedHourEnd = format(
										new Date(activity.hour_end),
										"HH:mm"
									);
									if (
										formattedVal >= formattedHourStart &&
										formattedVal <= formattedHourEnd
									)
										return false;
								}
								return true;
							},
							{
								message:
									"O profissional selecionado está com a agenda indisponivel nesse horário",
							}
						)
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
					hour_end: z
						.string()
						.refine(
							(val) => {
								const formattedVal = format(
									new Date(val),
									"HH:mm"
								);
								if (
									(formattedVal >= startLunch &&
										formattedVal < endLunch) ||
									formattedVal < startDay ||
									formattedVal > endDay
								) {
									return false;
								}
								return true;
							},
							{
								message:
									"O profissional selecionado não atende nesse horário",
							}
						)
						.refine(
							(val) => {
								for (const activity of profSchedule) {
									const formattedVal = format(
										new Date(val),
										"HH:mm"
									);
									const formattedHourStart = format(
										new Date(activity.hour_start),
										"HH:mm"
									);
									const formattedHourEnd = format(
										new Date(activity.hour_end),
										"HH:mm"
									);
									if (
										formattedVal >= formattedHourStart &&
										formattedVal <= formattedHourEnd
									)
										return false;
								}
								return true;
							},
							{
								message:
									"O profissional selecionado está com a agenda indisponivel nesse horário",
							}
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
					obs: z.string().optional(),
				})
				.parse(params);
			return right(
				new ActivityEntity()
					.defineDate(parsedParams.date)
					.defineHourStart(parsedParams.hour_start)
					.defineHourEnd(parsedParams.hour_end)
					.defineStatus(PaymentStatus.PENDING)
					.defineProcedures(parsedParams.procedures)
					.defineClient(parsedParams.client)
					.defineObs(parsedParams.obs)
					.defineProf(parsedParams.prof)
					.defineIsRecorrent(false)
					.defineActive(true)
					.defineScheduled(AppointmentStatus.SCHEDULED)
					.defineProfId(parsedParams.prof_id)
			);
		} catch (err) {
			console.log(err);
			return left(err);
		}
	}
}

export default ActivityEntity;
