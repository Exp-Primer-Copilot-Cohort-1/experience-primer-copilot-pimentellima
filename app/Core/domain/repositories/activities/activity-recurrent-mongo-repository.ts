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
import ActivityEntity from '../../entities/activities/activity'
import { MissingParamsError } from '../../errors/missing-params'
import { UnitNotFoundError } from '../../errors/unit-not-found'
import { PROJECTION_CLIENT, PROJECTION_DEFAULT } from '../helpers/projections'
import { ActivitiesRecurrentManagerInterface } from '../interface/activity-recurrent-manager.interface'

export class ActivityRecurrentMongoRepository
	implements ActivitiesRecurrentManagerInterface
{
	// eslint-disable-line
	constructor() {} // eslint-disable-line

	async findAllActivitiesPending(
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

	async createRecurrentActivity(
		unity_id: string,
		{ dates, ...values }: RecurrentActivityValues,
	): PromiseEither<AbstractError, IActivity[]> {
		try {
			if (!unity_id) return left(new MissingParamsError('unity_id'))

			const validatedActivities: IActivity[] = []

			for (let i = 0; i < dates.length; i++) {
				const date = dates[i]
				const activityOrErr = await ActivityEntity.build({
					...date,
					...values,
					unity_id,
				})
				if (activityOrErr.isLeft()) {
					return left(activityOrErr.extract())
				}

				validatedActivities.push(activityOrErr.extract())
			}

			const group_id = new mongoose.Types.ObjectId().toString()
			const pendingActivity = {
				...values,
				unity_id,
				group_id,
				type: STATUS_ACTIVITY.PENDING,
			}

			await Promise.all(
				new Array(values.recurrences - values.schedulings).map(async () => {
					const act = await ActivityPending.create(pendingActivity)
					return act
				}),
			)

			const scheduledActivities = await Promise.all(
				validatedActivities.map(
					async (activity) => await Activity.create(activity),
				),
			)
			return right(scheduledActivities)
		} catch (err) {
			console.log(err)
			return left(err)
		}
	}
}
