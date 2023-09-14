import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import Activity, { COLLECTIONS_REFS } from 'App/Models/Activity'
import { ActivityValues, STATUS_ACTIVITY, type IActivity } from 'App/Types/IActivity'
import ActivityEntity from '../../entities/activities/activity'
import { ClientNotFoundError, UserNotFoundError } from '../../errors'
import { ActivityNotFoundError } from '../../errors/activity-not-found'
import { MissingParamsError } from '../../errors/missing-params'
import { UnitNotFoundError } from '../../errors/unit-not-found'
import { PROJECTION_CLIENT, PROJECTION_DEFAULT } from '../helpers/projections'
import { ActivitiesManagerInterface } from '../interface/activity-manager.interface'

export class ActivityMongoRepository implements ActivitiesManagerInterface {
	constructor() { } // eslint-disable-line

	async findAllActivities(unity_id: string): PromiseEither<AbstractError, IActivity[]> {
		if (!unity_id) return left(new UnitNotFoundError())

		const activities = await Activity.find({
			unity_id,
			type: STATUS_ACTIVITY.MARKED,
		})
			.populate(COLLECTIONS_REFS.CLIENTS, PROJECTION_CLIENT)
			.populate(COLLECTIONS_REFS.PROFS, PROJECTION_DEFAULT)
			.populate(COLLECTIONS_REFS.PROCEDURES, PROJECTION_DEFAULT)
			.populate(COLLECTIONS_REFS.HEALTH_INSURANCES, PROJECTION_DEFAULT)
			.sort({ date: -1 })

		return right(activities)
	}

	async findActivitiesByProf(
		unity_id: string,
		prof_id: string,
	): PromiseEither<AbstractError, IActivity[]> {
		if (!unity_id) return left(new UnitNotFoundError())
		if (!prof_id) return left(new UserNotFoundError())

		const activities = await Activity.find({
			unity_id,
			prof: prof_id,
			type: STATUS_ACTIVITY.MARKED,
		})
			.populate(COLLECTIONS_REFS.CLIENTS, PROJECTION_CLIENT)
			.populate(COLLECTIONS_REFS.PROFS, PROJECTION_DEFAULT)
			.sort({ date: -1 })

		return right(activities)
	}

	async findActivitiesByClient(
		unity_id: string,
		client_id: string,
	): PromiseEither<AbstractError, IActivity[]> {
		if (!unity_id) return left(new UnitNotFoundError())
		if (!client_id) return left(new ClientNotFoundError())

		const activities = await Activity.find({
			unity_id,
			client: client_id,
			type: STATUS_ACTIVITY.MARKED,
		})
			.populate(COLLECTIONS_REFS.CLIENTS, PROJECTION_CLIENT)
			.populate(COLLECTIONS_REFS.PROFS, PROJECTION_DEFAULT)
			.sort({ date: -1 })

		return right(activities)
	}

	async createActivity(
		unity_id: string,
		params: IActivity,
	): PromiseEither<AbstractError, IActivity> {
		if (!unity_id) return left(new UnitNotFoundError())
		const activityOrErr = await ActivityEntity.build(params)
		if (activityOrErr.isLeft()) return left(activityOrErr.extract())
		const activity = activityOrErr.extract().params() as IActivity

		const created = await Activity.create({
			...activity,
			client: activity.client,
			prof: activity.prof,
			unity_id,
		})

		return right(created.toObject())
	}

	async findActivityById(id: string): PromiseEither<AbstractError, IActivity> {
		if (!id) return left(new MissingParamsError('id'))

		const activity = await Activity.findById(id)
			.populate(COLLECTIONS_REFS.CLIENTS, PROJECTION_CLIENT)
			.populate(COLLECTIONS_REFS.PROFS, PROJECTION_DEFAULT)
			.sort({ date: -1 })
			.orFail(new ActivityNotFoundError())

		return right(activity.toObject())
	}

	async deleteActivityById(id: string): PromiseEither<AbstractError, IActivity> {
		if (!id) return left(new MissingParamsError('id'))

		const activity = await Activity.findByIdAndDelete(id)
			.populate(COLLECTIONS_REFS.CLIENTS, PROJECTION_CLIENT)
			.populate(COLLECTIONS_REFS.PROFS, PROJECTION_DEFAULT)
			.sort({ date: -1 })
			.orFail(new ActivityNotFoundError())

		return right(activity.toObject())
	}

	async updateActivityById(
		id: string,
		values: ActivityValues,
	): PromiseEither<AbstractError, IActivity> {
		if (!id) return left(new ActivityNotFoundError())

		const updatedActivity = await Activity.findByIdAndUpdate(id, values, {
			new: true,
		})
			.populate(COLLECTIONS_REFS.CLIENTS, PROJECTION_CLIENT)
			.populate(COLLECTIONS_REFS.PROFS, PROJECTION_DEFAULT)
			.sort({ date: -1 })
			.orFail(new ActivityNotFoundError())

		return right(updatedActivity.toObject())
	}
}
