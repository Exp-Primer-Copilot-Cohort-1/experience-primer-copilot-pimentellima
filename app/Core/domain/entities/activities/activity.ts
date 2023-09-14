/* eslint-disable @typescript-eslint/naming-convention */
import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { AppointmentStatus } from 'App/Helpers'
import ScheduleBlock from 'App/Models/ScheduleBlock'
import User from 'App/Models/User'
import { ActivityPayment, IActivity, STATUS_ACTIVITY } from 'App/Types/IActivity'
import { IScheduleBlock } from 'App/Types/IScheduleBlock'
import { IUser } from 'App/Types/IUser'
import areRangesIntersecting from 'App/utils/are-ranges-intersecting'
import { getDay, isAfter, isSameDay, startOfYesterday } from 'date-fns'
import { z } from 'zod'
import { UserNotFoundError } from '../../errors'
import { AbstractActivity } from '../abstract/activity-abstract'

const validationActivity = (profData, scheduleBlocks) =>
	z
		.object({
			prof: z.string(),
			client: z.string(),
			date: z
				.string()
				.refine((val) => isAfter(new Date(val), startOfYesterday()))
				.refine((val) => {
					const weekDay = getDay(new Date(val))
					if (
						(weekDay === 0 && !profData.is_sunday) ||
						(weekDay === 1 && !profData.is_monday) ||
						(weekDay === 2 && !profData.is_tuesday) ||
						(weekDay === 3 && !profData.is_thursday) ||
						(weekDay === 4 && !profData.is_wednesday) ||
						(weekDay === 5 && !profData.is_friday) ||
						(weekDay === 6 && !profData.is_saturday)
					) {
						return false
					}
					return true
				}),
			hour_start: z.string(),
			hour_end: z.string(),
			procedures: z.array(
				z.object({
					_id: z.string(),
					minutes: z.number(),
					price: z.number(),
					health_insurance: z.string(),
				}),
			),
			obs: z.string().optional(),
		})
		.refine(({ hour_start, hour_end }) => {
			for (const sb of scheduleBlocks) {
				if (
					areRangesIntersecting({
						range1Start: new Date(hour_start),
						range1End: new Date(hour_end),
						range2Start: new Date(sb.hour_start),
						range2End: new Date(sb.hour_end),
					})
				) {
					return false
				}
			}
			return true
		})
export class ActivityEntity extends AbstractActivity implements IActivity {
	private _date: Date
	private _hour_start: string
	private _hour_end: string
	private _scheduled: AppointmentStatus
	private _type: STATUS_ACTIVITY.MARKED
	private _started_at?: Date
	private _finished_at?: Date
	private _payment?: ActivityPayment

	public get type() {
		return this._type
	}

	public get payment() {
		return this._payment
	}

	defineType(type: STATUS_ACTIVITY.MARKED): ActivityEntity {
		this._type = type
		return this
	}

	public get started_at(): Date | undefined {
		return this._started_at
	}

	public get finished_at(): Date | undefined {
		return this._finished_at
	}

	defineStartedAt(started_at: Date | undefined) {
		this._started_at = started_at
		return this
	}

	defineFinishedAt(finished_at: Date | undefined) {
		this._finished_at = finished_at
		return this
	}

	private constructor() {
		super()
	}

	public get date(): Date {
		return this._date
	}

	public get hour_start(): string {
		return this._hour_start
	}

	public get hour_end(): string {
		return this._hour_end
	}

	public get scheduled(): AppointmentStatus {
		return this._scheduled
	}

	defineDate(date: Date): this {
		this._date = date
		return this
	}
	defineHourStart(date: string): this {
		this._hour_start = date
		return this
	}
	defineHourEnd(date: string): this {
		this._hour_end = date
		return this
	}
	defineScheduled(scheduled: AppointmentStatus): this {
		this._scheduled = scheduled
		return this
	}

	public static async build(
		params: IActivity,
	): PromiseEither<AbstractError, ActivityEntity> {
		try {
			const profData = (await User.findById(params.prof)) as IUser
			if (!profData) return left(new UserNotFoundError())

			const scheduleBlocksData = (await ScheduleBlock.find({
				'prof.value': params.prof,
			})) as IScheduleBlock[]

			const scheduleBlocks = scheduleBlocksData.filter(({ date }) => {
				return isSameDay(new Date(params?.date), new Date(date))
			})

			validationActivity(profData, scheduleBlocks).parse(params)

			return right(
				new ActivityEntity()
					.defineDate(new Date(params.date))
					.defineHourStart(params.hour_start)
					.defineHourEnd(params.hour_end)
					.defineProcedures(params.procedures)
					.defineScheduled(params.scheduled || AppointmentStatus.SCHEDULED)
					.defineClient(params.client?.toString())
					.defineType(STATUS_ACTIVITY.MARKED)
					.defineObs(params.obs)
					.defineProf(params.prof?.toString())
					.defineActive(true),
			)
		} catch (err) {
			console.log(err)
			return left(err)
		}
	}
}

export default ActivityEntity
