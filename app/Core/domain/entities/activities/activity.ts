/* eslint-disable @typescript-eslint/naming-convention */
import { AbstractError } from "App/Core/errors/error.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import { AppointmentStatus, PaymentStatus, STATUS } from "App/Helpers";
import { AbstractActivity } from "../abstract/activity-abstract";
import { z } from "zod";
import { IActivity } from "Types/IActivities";
import { InvalidParamsError } from "../../errors/invalid-params-error";

export class ActivityEntity extends AbstractActivity {
	private _date: Date;
	private _hour_start: string;
	private _hour_end: string;
	private _schedule_block: boolean;
	private _all_day: boolean;
	private _is_recorrent: boolean;
	private _user_id?: string;
	private _scheduled: AppointmentStatus;

	private constructor() {
		super();
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
	
	public get user_id(): string | undefined {
	return this._user_id;
	}
	
	public get scheduled(): AppointmentStatus {
	return this._scheduled;
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
	defineUserId(user_id?: string): this {
		this._user_id = user_id;
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
			const proceduresSchema = z.object({
				value: z.string(),
				label: z.string(),
				minutes: z.number(),
				color: z.string(),
				val: z.number(),
				health_insurance: z
					.object({
						value: z.string(),
						label: z.string(),
						price: z.number(),
					})
					.optional(),
				status: z.nativeEnum(PaymentStatus),
			})

			const schema = z.object({
				user_id: z.string().optional(),
				active: z.boolean(),
				all_day: z.boolean(),
				prof_id: z.string(),
				client: z.object({
					value: z.string(),
					label: z.string(),
					celphone: z.string(),
					partner: z.object({}).nullable()
				}),
				obs: z.string().optional().nullable(),
				unity_id: z.string(),
				schedule_block: z.boolean().default(false),
				phone: z.string().optional().nullable(),
				procedures: z.array(proceduresSchema),
				paid: z.boolean().optional().default(false),
			});

			schema.parse({
				...params,
				user_id: params.user_id?.toString(),
				unity_id: params.unity_id?.toString(),
				client_id: params.client_id?.toString(),
				prof_id: params.prof_id?.toString(),

			});
			return right(
				new ActivityEntity()
					.defineDate(params.date)
					.defineHourStart(params.hour_start)
					.defineHourEnd(params.hour_end)
					.defineStatus(params.status)
					.defineScheduleBlock(params.schedule_block)
					.defineProcedures(params.procedures)
					.defineClient(params.client)
					.defineObs(params.obs)
					.defineProf(params.prof)
					.definePhone(params.phone)
					.defineAllDay(params.all_day)
					.defineIsRecorrent(params.is_recorrent)
					.defineActive(params.active)
					.defineUnityId(params.unity_id.toString())
					.defineUserId(params.user_id?.toString())
					.defineScheduled(params.scheduled)
					.defineProfId(params.prof_id.toString())
			);
		} catch(err) {
			console.log(err)
			return left(new InvalidParamsError(err));
		}
	}
}

export default ActivityEntity;
