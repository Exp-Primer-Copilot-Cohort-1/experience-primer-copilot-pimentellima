import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { AppointmentStatus, PaymentStatus } from 'App/Helpers'
import Activity from 'App/Models/Activity'
import ActivityPending from 'App/Models/ActivityPending'
import {
	ActivityValues,
	IActivity,
	IActivityPending,
	RecurrentActivityValues,
} from 'Types/IActivity'
import { ITransaction } from 'Types/ITransaction'
import mongoose from 'mongoose'
import ActivityEntity from '../../entities/activities/activity'
import { ActivityPaymentEntity } from '../../entities/activity-payment/ActivityPaymentEntity'
import ActivityPendingEntity from '../../entities/activity-pending'
import { ActivityNotFoundError } from '../../errors/activity-not-found'
import { MissingParamsError } from '../../errors/missing-params'
import { UnitNotFoundError } from '../../errors/unit-not-found'
import { ActivitiesManagerInterface } from '../interface/activity-manager.interface'

export class ActivityMongoRepository implements ActivitiesManagerInterface {
	constructor() { }

	async findAllActivities(unity_id: string): PromiseEither<AbstractError, IActivity[]> {
		if (!unity_id) return left(new UnitNotFoundError())

		const activities = await Activity.find({
			unity_id,
			type: 'marked',
		})
			.populate('client', {
				_id: 0,
				label: '$name',
				value: '$_id',
				celphone: 1,
				email: 1,
			})
			.populate('prof', {
				_id: 0,
				label: '$name',
				value: '$_id',
			})
			.sort({ date: -1 })

		return right(activities as unknown as IActivity[])
	}

	async findActivitiesByProf(
		unity_id: string,
		prof_id: string,
	): PromiseEither<AbstractError, IActivity[]> {
		if (!unity_id) return left(new UnitNotFoundError())
		if (!prof_id) return left(new MissingParamsError('O prof_id é obrigatório'))

		const activities = await Activity.find({
			unity_id,
			prof: prof_id,
			type: 'marked',
		})
			.populate('client', {
				_id: 0,
				label: '$name',
				value: '$_id',
				celphone: 1,
				email: 1,
			})
			.populate('prof', {
				_id: 0,
				label: '$name',
				value: '$_id',
			})
			.sort({ date: -1 })

		return right(activities as unknown as IActivity[])
	}

	async findActivitiesByClient(
		unity_id: string,
		client_id: string,
	): PromiseEither<AbstractError, IActivity[]> {
		if (!unity_id) return left(new MissingParamsError('unity id'))
		if (!client_id) return left(new MissingParamsError('client id'))

		const activities = await Activity.find({
			unity_id,
			client: client_id,
			type: 'marked',
		})
			.populate('client', {
				_id: 0,
				label: '$name',
				value: '$_id',
				celphone: 1,
				email: 1,
			})
			.populate('prof', {
				_id: 0,
				label: '$name',
				value: '$_id',
			})
			.sort({ date: -1 })

		return right(activities as unknown as IActivity[])
	}

	async findAllActivitiesPending(
		unity_id: string,
		...args: unknown[]
	): PromiseEither<AbstractError, IActivityPending[]> {
		if (!unity_id) return left(new MissingParamsError('unity id'))

		const attrs = (args[0] as { [key: string]: string }) || {}

		const activities = await ActivityPending.find({
			...attrs,
			unity_id,
			type: 'pending',
		})
			.populate('client', {
				_id: 0,
				label: '$name',
				value: '$_id',
				celphone: 1,
				email: 1,
			})
			.populate('prof', {
				_id: 0,
				label: '$name',
				value: '$_id',
			})
			.sort({ date: -1 })
		return right(activities as unknown as IActivityPending[])
	}

	async updateActivityStartedAt(
		id: string,
		started_at: Date,
	): PromiseEither<AbstractError, IActivity> {
		const activity = await Activity.findByIdAndUpdate(
			id,
			{
				$set: {
					started_at,
					scheduled: AppointmentStatus.IN_PROGRESS,
				},
			},
			{
				returnDocument: 'after',
			},
		)
		if (!activity) return left(new AbstractError('Error updating activity', 500))

		return right(activity.toObject())
	}

	async updateActivityFinishedAt(
		id: string,
		finished_at: Date,
	): PromiseEither<AbstractError, IActivity> {
		const activity = await Activity.findByIdAndUpdate(
			id,
			{
				$set: {
					finished_at,
					scheduled: AppointmentStatus.COMPLETED,
				},
			},
			{
				returnDocument: 'after',
			},
		)
		if (!activity) return left(new AbstractError('Error updating activity', 500))
		return right(activity.toObject())
	}

	async updateActivityStatusById(
		id: string,
		status: AppointmentStatus,
	): PromiseEither<AbstractError, IActivity> {
		const activity = await Activity.findByIdAndUpdate(
			id,
			{
				$set: {
					scheduled: status,
				},
			},
			{
				returnDocument: 'after',
			},
		)
		if (!activity) return left(new AbstractError('Error updating activity', 500))

		return right(activity.toObject())
	}

	async updateActivityPayment(
		id: string,
		unity_id: string,
		values: Partial<ITransaction>,
	): PromiseEither<AbstractError, IActivity> {
		if (!id) return left(new MissingParamsError('ID de Atividade'))

		const paymentOrErr = await ActivityPaymentEntity.build({
			...(values as any),
			date: new Date(values.date || ''),
		})

		if (paymentOrErr.isLeft()) return left(paymentOrErr.extract())

		const updatedActivity = await Activity.findOneAndUpdate(
			{ _id: id, unity_id: unity_id.toString() },
			{
				$set: {
					payment: paymentOrErr.extract(),
					status: PaymentStatus.PAID,
				},
			},
			{
				returnDocument: 'after',
			},
		)

		if (!updatedActivity) {
			return left(new AbstractError('Error updating activity', 500))
		}

		return right(updatedActivity.toObject())
	}

	async createRecurrentActivity(
		unity_id: string,
		{ values, dates, pending }: RecurrentActivityValues,
	): PromiseEither<AbstractError, IActivity[]> {
		if (!unity_id) return left(new MissingParamsError('unity_id'))

		const validatedActivities: IActivity[] = []

		for (let i = 0; i < dates.length; i++) {
			const date = dates[i]
			const activityOrErr = await ActivityEntity.build({
				...date,
				...values,
			})
			if (activityOrErr.isLeft()) {
				return left(activityOrErr.extract())
			}
			validatedActivities.push(
				activityOrErr.extract().defineUnityId(unity_id).params(),
			)
		}

		const pendingActivityOrErr = await ActivityPendingEntity.build(values)
		if (pendingActivityOrErr.isLeft())
			return left(new AbstractError('Error validating pending activities', 500))

		const groupId = new mongoose.Types.ObjectId().toString()
		for (let i = 0; i < pending; i++) {
			await ActivityPending.create(
				pendingActivityOrErr
					.extract()
					.defineUnityId(unity_id)
					.defineGroupId(groupId)
					.params(),
			)
		}

		const newActivities = await Promise.all(
			validatedActivities.map(async (activity) => await Activity.create(activity)),
		)
		return right(newActivities)
	}

	async createActivity(
		unity_id: string,
		params: ActivityValues,
	): PromiseEither<AbstractError, IActivity> {
		if (!unity_id) return left(new MissingParamsError('unity_id'))
		const activityOrErr = await ActivityEntity.build(params)
		if (activityOrErr.isLeft()) return left(activityOrErr.extract())
		const activity = activityOrErr.extract().params() as IActivity

		const newActivity = await Activity.create({
			...activity,
			client: activity.client.value,
			prof: activity.prof.value,
			unity_id,
		})

		const populateActivity = await (
			await newActivity.populate('client', {
				_id: 0,
				label: '$name',
				value: '$_id',
				celphone: 1,
				email: 1,
			})
		).populate('prof', {
			_id: 0,
			label: '$name',
			value: '$_id',
		})

		return right(populateActivity as unknown as IActivity)
	}

	async findActivityById(id: string): PromiseEither<AbstractError, IActivity> {
		if (!id) return left(new MissingParamsError('id'))

		const activity = await Activity.findById(id)
			.populate('client', {
				_id: 0,
				label: '$name',
				value: '$_id',
				celphone: 1,
				email: 1,
			})
			.populate('prof', {
				_id: 0,
				label: '$name',
				value: '$_id',
			})
			.sort({ date: -1 })
		if (!activity) return left(new ActivityNotFoundError())

		return right(activity as unknown as IActivity)
	}

	async deleteActivityById(id: string): PromiseEither<AbstractError, IActivity> {
		if (!id) return left(new MissingParamsError('id'))

		const activity = await Activity.findByIdAndDelete(id)
			.populate('client', {
				_id: 0,
				label: '$name',
				value: '$_id',
				celphone: 1,
				email: 1,
			})
			.populate('prof', {
				_id: 0,
				label: '$name',
				value: '$_id',
			})
			.sort({ date: -1 })
		if (!activity) return left(new ActivityNotFoundError())

		return right(activity as unknown as IActivity)
	}

	async updateActivityById(
		id: string,
		values: ActivityValues,
	): PromiseEither<AbstractError, IActivity> {
		if (!id) return left(new MissingParamsError('id'))
		const oldActivity = await Activity.findById(id)
		if (!oldActivity) return left(new ActivityNotFoundError())

		const hasRescheduled =
			oldActivity.date &&
			(oldActivity.date?.toISOString() !== values.date ||
				oldActivity.hour_start !== values.hour_start ||
				oldActivity.hour_end !== values.hour_end)

		const activityOrErr = await ActivityEntity.build({
			...oldActivity,
			...values,
			scheduled: hasRescheduled
				? AppointmentStatus.RESCHEDULED
				: oldActivity.scheduled,
		})
		if (activityOrErr.isLeft()) return left(activityOrErr.extract())

		const updatedActivity = await Activity.findByIdAndUpdate(
			id,
			activityOrErr
				.extract()
				.defineUnityId(oldActivity.unity_id.toString())
				.params(),
			{
				returnDocument: 'after',
			},
		)
			.populate('client', {
				_id: 0,
				label: '$name',
				value: '$_id',
				celphone: 1,
				email: 1,
			})
			.populate('prof', {
				_id: 0,
				label: '$name',
				value: '$_id',
			})
			.sort({ date: -1 })
		if (!updatedActivity)
			return left(new AbstractError('Error updating activity', 500))
		return right(updatedActivity.toObject())
	}
}
