import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import Activity, { COLLECTIONS_REFS } from 'App/Models/Activity'
import ActivityPending from 'App/Models/ActivityPending'
import {
	IActivity,
	IActivityPending,
	RecurrentActivityValues,
	STATUS_ACTIVITY,
} from 'App/Types/IActivity'
import mongoose from 'mongoose'
import { injectable, registry } from 'tsyringe'
import ActivityEntity from '../../entities/activities/activity'
import { ActivityPendingEntity } from '../../entities/activity-pending'
import { UnitNotFoundError } from '../../errors/unit-not-found'
import { UnityIdNotProvidedError } from '../../errors/unit-not-id-provider'
import { PROJECTION_CLIENT, PROJECTION_DEFAULT } from '../helpers/projections'
import { ActivitiesRecurrentManagerInterface } from '../interface/activity-recurrent-manager.interface'

@injectable()
@registry([{ token: ActivityRecurrentMongoRepository, useClass: ActivityRecurrentMongoRepository }])
export class ActivityRecurrentMongoRepository
	implements ActivitiesRecurrentManagerInterface {
	// eslint-disable-line
	constructor() { } // eslint-disable-line

	async findAll(
		unity_id: string,
		...args: unknown[]
	): PromiseEither<AbstractError, IActivityPending[]> {
		if (!unity_id) return left(new UnitNotFoundError())

		const attrs = (args[0] as { [key: string]: string }) || {}

		const activities = await ActivityPending.find({
			...attrs,
			unity_id,
			type: STATUS_ACTIVITY.PENDING,
		})
			.populate(COLLECTIONS_REFS.CLIENTS, PROJECTION_CLIENT)
			.populate(COLLECTIONS_REFS.PROFS, PROJECTION_DEFAULT)
			.populate(COLLECTIONS_REFS.PROCEDURES, PROJECTION_DEFAULT)
			.sort({ date: -1 })

		return right(activities)
	}

	async create(
		unity_id: string,
		{ dates, ...values }: RecurrentActivityValues,
	): PromiseEither<AbstractError, IActivity[]> {
		try {
			if (!unity_id) return left(new UnityIdNotProvidedError())
			const group_id = new mongoose.Types.ObjectId().toString()

			const validatedActivities: IActivity[] = []

			for (let i = 0; i < dates.length; i++) {
				const date = dates[i]
				const activityOrErr = await ActivityEntity.build({
					...date,
					...values,
					group_id,
					unity_id,
				})
				if (activityOrErr.isLeft()) {
					return left(activityOrErr.extract())
				}

				validatedActivities.push(activityOrErr.extract())
			}


			const pendingActivityOrErr = await ActivityPendingEntity.build({
				...values,
				unity_id,
				group_id,
			})

			if (pendingActivityOrErr.isLeft()) {
				return left(pendingActivityOrErr.extract())
			}

			const pendingActivity = pendingActivityOrErr.extract()

			const recurrences = values.recurrences - values.schedulings

			const promisePending = Promise.all(
				new Array(recurrences).fill(0).map(async () => {
					return await ActivityPending.create(pendingActivity)
				}),
			)

			const promiseScheduled = Promise.all(
				validatedActivities.map(
					async (activity) => await Activity.create(activity),
				),
			)

			const [scheduledActivities] = await Promise.all([promiseScheduled, promisePending])

			return right(scheduledActivities)
		} catch (err) {
			console.log(err)
			return left(err)
		}
	}
}
