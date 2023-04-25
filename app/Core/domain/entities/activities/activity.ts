/* eslint-disable @typescript-eslint/naming-convention */
import { AbstractError } from 'App/Core/errors/error.interface';
import { PromiseEither, left, right } from 'App/Core/shared';
import { AppointmentStatus, PaymentStatus, STATUS } from 'App/Helpers';
import { MissingParamsError } from '../../errors/missing-params';
import { AbstractActivity } from '../abstract/activity-abstract';
import { z } from 'zod';
import { IActivity } from 'Types/IActivities';

export class Activity extends AbstractActivity {
	public date: Date;
	public hour_start: Date;
	public hour_end: Date;
	public schedule_block: boolean;
	public all_day: boolean;
	public is_recorrent: boolean;
	public user_id?: string;
	public scheduled: AppointmentStatus;

	private constructor() {
		super();
	}

	defineDate(date: Date): this {
		this.date = date;
		return this;
	}
	defineHourStart(date: Date): this {
		this.hour_start = date;
		return this;
	}
	defineHourEnd(date: Date): this {
		this.hour_end = date;
		return this;
	}
	defineScheduleBlock(schedule_block: boolean): this {
		this.schedule_block = schedule_block;
		return this;
	}
	defineAllDay(all_day: boolean): this {
		this.all_day = all_day;
		return this;
	}
	defineIsRecorrent(is_recorrent: boolean): this {
		this.is_recorrent = is_recorrent;
		return this;
	}
	defineUserId(user_id?: string): this {
		this.user_id = user_id;
		return this;
	}
	defineScheduled(scheduled: AppointmentStatus): this {
		this.scheduled = scheduled;
		return this;
	}

	public static async build(
		params: IActivity,
	): PromiseEither<AbstractError, Activity> {

		const schema = z.object({
			date: z.date(),
			user_id: z.string().optional(),
			hour_start: z.date(),
			hour_end: z.date(),
			active: z.boolean(),
			all_day: z.boolean(),
			prof_id: z.string(),
			client_id: z.string(),
			unity_id: z.string(),
			status: z.nativeEnum(STATUS),
			schedule_block: z.boolean(),
			obs: z.string().optional(),
			phone: z.string().optional(),
			procedures: z.object({
				value: z.string(),
				label: z.string(),
				minutes: z.number(),
				color: z.string(),
				val: z.number(),
				health_insurance: z.object({
					value: z.string(),
					label: z.string(),
					price: z.number(),
				}).optional(),
				status: z.nativeEnum(PaymentStatus),
			  })
		})
		schema.parse({
			...params,
			user_id: params.user_id?.toString(),
			unity_id: params.unity_id.toString(),
			client_id: params.client_id.toString(),
			prof_id: params.prof_id.toString()
		});

		try {
			return right(new Activity()
				.defineDate(params.date)
				.defineHourStart(params.hour_start)
				.defineHourEnd(params.hour_end)
				.defineStatus(params.status)
				.defineScheduleBlock(params.schedule_block)
				.defineProcedures(params.procedures)
				.defineClientId(params.client_id.toString())
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
		} catch (err) {
			return left(new MissingParamsError(null as any));
		}
	}
}

export default Activity;
