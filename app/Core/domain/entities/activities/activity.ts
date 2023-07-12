/* eslint-disable @typescript-eslint/naming-convention */
import { AbstractError } from "App/Core/errors/error.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import { AppointmentStatus, PaymentStatus } from "App/Helpers";
import Activity from "App/Models/Activity";
import Client from "App/Models/Client";
import HealthInsurance from "App/Models/HealthInsurance";
import Procedure from "App/Models/Procedure";
import ScheduleBlock from "App/Models/ScheduleBlock";
import User from "App/Models/User";
import { IActivity } from "Types/IActivity";
import { IScheduleBlock } from "Types/IScheduleBlock";
import { IUser } from "Types/IUser";
import {
	getDay,
	isAfter,
	isBefore,
	isSameDay,
	startOfYesterday,
} from "date-fns";
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

	public static async build(params: {
		activityId?: string;
		unity_id: string;
		profId: string;
		clientId: string;
		procedures: {
			procedureId: string;
			healthInsuranceId: string;
			val: string;
		}[];
		date: string;
		hourStart: string;
		hourEnd: string;
		obs?: string;
	}): PromiseEither<AbstractError, ActivityEntity> {
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

			const profSchedule = [
				...activities.filter(
					(activity) =>
						!(activity._id?.toString() === params.activityId)
				),
				...scheduleBlocks,
			].filter(({ date }) => {
				return isSameDay(new Date(params.date), new Date(date));
			});

			z.object({
				profId: z.string(),
				clientId: z.string(),
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
				procedures: z.array(
					z.object({
						procedureId: z.string(),
						healthInsuranceId: z.string(),
						val: z.string().regex(/\d{0,2}(\,\d{1,2})?/),
					})
				),
				obs: z.string().optional(),
			}).parse(params);

			const procedures = await Promise.all(
				params.procedures.map(async (procedure) => {
					const { procedureId, healthInsuranceId, val } = procedure;
					const procedureData = await Procedure.findById(procedureId);
					const healthInsuranceData = await HealthInsurance.findById(
						healthInsuranceId
					);
					if (!procedureData || !healthInsuranceData)
						throw new AbstractError("Error creating activity", 500);
					const healthInsurancePrice =
						procedureData.health_insurance.find(
							(i) => i.value === healthInsuranceId
						)?.price || "";
					return {
						value: procedureId,
						label: procedureData.name,
						color: procedureData.color,
						minutes: procedureData.minutes,
						val,
						status: PaymentStatus.PENDING,
						health_insurance: {
							value: healthInsuranceId,
							label: healthInsuranceData.name,
							price: healthInsurancePrice,
						},
					};
				})
			);

			const clientData = await Client.findById(params.clientId);
			if (!clientData)
				return left(new AbstractError("Could not find client", 404));
			const client = {
				value: params.clientId,
				label: clientData.name,
				celphone: clientData.celphone,
				email: clientData.email,
				partner: clientData.partner,
			};

			const prof = {
				value: params.profId,
				label: profData.name,
			};

			return right(
				new ActivityEntity()
					.defineDate(new Date(params.date))
					.defineUnityId(params.unity_id)
					.defineHourStart(params.hourStart)
					.defineHourEnd(params.hourEnd)
					.defineStatus(PaymentStatus.PENDING)
					.defineProcedures(procedures)
					.defineClient(client)
					.defineObs(params.obs)
					.defineProf(prof)
					.defineIsRecorrent(false)
					.defineActive(true)
					.defineScheduled(AppointmentStatus.SCHEDULED)
					.defineProfId(params.profId)
			);
		} catch (err) {
			console.log(err);
			return left(err);
		}
	}
}

export default ActivityEntity;
