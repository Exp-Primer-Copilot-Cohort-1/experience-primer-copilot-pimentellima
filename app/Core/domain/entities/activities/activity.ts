import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { AppointmentStatus } from 'App/Helpers'
import ScheduleBlock from 'App/Models/ScheduleBlock'
import User from 'App/Models/User'
import { ActivityPayment, IActivity, STATUS_ACTIVITY } from 'App/Types/IActivity'
import { IScheduleBlock } from 'App/Types/IScheduleBlock'
import { IUser } from 'App/Types/IUser'
import { isSameDay } from 'date-fns'
import { UserNotFoundError } from '../../errors'
import { AbstractActivity } from '../abstract/activity-abstract'
import validationActivity from './validations-activity'


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
		return this
			.defineScheduled(params.scheduled || this.scheduled)
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
			console.log(JSON.stringify(err, null, 2))
			return left(err)
		}
	}
}

export default ActivityEntity
