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
				.date()
				.refine((val) => isAfter(val, startOfYesterday()))
				.refine((val) => {
					const weekDay = getDay(val)
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
	date: Date
	hour_start: string
	hour_end: string
	scheduled: AppointmentStatus
	type: STATUS_ACTIVITY.MARKED
	started_at?: Date
	finished_at?: Date
	payment?: ActivityPayment

	defineType(type: STATUS_ACTIVITY.MARKED): ActivityEntity {
		this.type = type
		return this
	}

	defineStartedAt(started_at: Date | undefined) {
		this.started_at = started_at
		return this
	}

	defineFinishedAt(finished_at: Date | undefined) {
		this.finished_at = finished_at
		return this
	}

	private constructor() {
		super()
	}

	defineDate(date: Date | string): this {
		this.date = typeof date === 'string' ? new Date(date) : date
		return this
	}
	defineHourStart(date: string): this {
		this.hour_start = date
		return this
	}
	defineHourEnd(date: string): this {
		this.hour_end = date
		return this
	}
	defineScheduled(scheduled: AppointmentStatus): this {
		this.scheduled = scheduled
		return this
	}

	rescheduled(): this {
		this.scheduled = AppointmentStatus.RESCHEDULED
		return this
	}

	private updateDate(date: Date | string): this {
		const stringDate = this.date.toISOString()
		const stringDateUpdate = typeof date === 'string' ? date : date.toISOString()

		if (stringDate === stringDateUpdate) return this

		return this.defineDate(date).rescheduled()
	}

	private updateHourStart(date: string): this {
		if (this.hour_start === date) return this
		return this.defineHourStart(date).rescheduled()
	}

	private updateHourEnd(date: string): this {
		if (this.hour_end === date) return this
		return this.defineHourEnd(date).rescheduled()
	}

	update(params: Partial<IActivity>): ActivityEntity {
		return this.defineScheduled(params.scheduled || this.scheduled)
			.updateDate(params.date || this.date)
			.updateHourStart(params.hour_start || this.hour_start)
			.updateHourEnd(params.hour_end || this.hour_end)
			.defineProcedures(params.procedures || this.procedures)
			.defineClient(params.client?.toString() || this.client?.toString())
			.defineType(params.type || this.type)
			.defineObs(params.obs || this.obs)
			.defineProf(params.prof?.toString() || this.prof?.toString())
			.defineActive(params.active || this.active)
			.defineUnityId(params.unity_id as string)
			.defineId((params._id as string) || (this._id as string))
	}

	public static async build(
		params: IActivity,
	): PromiseEither<AbstractError, ActivityEntity> {
		try {
			const activity = new ActivityEntity()
				.defineDate(new Date(params.date))
				.defineHourStart(params.hour_start)
				.defineHourEnd(params.hour_end)
				.defineProcedures(params.procedures)
				.defineScheduled(params.scheduled || AppointmentStatus.SCHEDULED)
				.defineClient(params.client?.toString())
				.defineType(STATUS_ACTIVITY.MARKED)
				.defineObs(params.obs)
				.defineProf(params.prof?.toString())
				.defineActive(true)
				.defineUnityId(params.unity_id as string)

			const profData = (await User.findById(params.prof)) as IUser
			if (!profData) return left(new UserNotFoundError())

			const scheduleBlocksData = (await ScheduleBlock.find({
				'prof.value': params.prof,
			})) as IScheduleBlock[]

			const scheduleBlocks = scheduleBlocksData.filter(({ date }) => {
				return isSameDay(new Date(params?.date), new Date(date))
			})

			validationActivity(profData, scheduleBlocks).parse(activity)

			return right(activity)
		} catch (err) {
			console.log('erro no zod')
			return left(err)
		}
	}
}

export default ActivityEntity
