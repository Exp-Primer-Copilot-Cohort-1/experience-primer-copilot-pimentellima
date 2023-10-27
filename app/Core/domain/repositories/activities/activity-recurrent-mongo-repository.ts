import { OptsQuery } from 'App/Core/domain/entities/helpers/opts-query'
import { ActivityNotGroupIdProvider } from 'App/Core/domain/errors/activity-not-group-id-provider'
import { UnityNotFoundError } from 'App/Core/domain/errors/unity-not-found'
import { UnityIdNotProvidedError } from 'App/Core/domain/errors/unity-not-id-provider'
import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { COLLECTIONS_REFS } from 'App/Models/Activity'
import ActivityPending from 'App/Models/ActivityPending'
import {
	IActivityPending,
	STATUS_ACTIVITY
} from 'App/Types/IActivity'
import { inject, injectable, registry } from 'tsyringe'
import { PROJECTION_CLIENT, PROJECTION_DEFAULT } from '../helpers/projections'
import { ActivitiesRecurrentManagerContract } from '../interface/activity-recurrent-manager.interface'

@injectable()
@registry([{ token: ActivityRecurrentMongoRepository, useClass: ActivityRecurrentMongoRepository }])
export class ActivityRecurrentMongoRepository
	implements ActivitiesRecurrentManagerContract {
	// eslint-disable-line
	constructor(
		@inject(OptsQuery) private readonly opts?: OptsQuery,
	) { } // eslint-disable-line

	async findAll(
		unity_id: string,
		...args: unknown[]
	): PromiseEither<AbstractError, IActivityPending[]> {
		if (!unity_id) return left(new UnityNotFoundError())

		const attrs = (args[0] as { [key: string]: string }) || {}

		const activities = await ActivityPending.find({
			...attrs,
			unity_id,
			type: STATUS_ACTIVITY.PENDING,
		})
			.where(this.opts?.where || {})
			.populate(COLLECTIONS_REFS.CLIENTS, PROJECTION_CLIENT)
			.populate(COLLECTIONS_REFS.PROFS, PROJECTION_DEFAULT)
			.populate(COLLECTIONS_REFS.PROCEDURES, PROJECTION_DEFAULT)
			.populate(COLLECTIONS_REFS.HEALTH_INSURANCES, PROJECTION_DEFAULT)
			.sort({ date: -1 })

		return right(activities)
	}

	async create(
		unity_id: string,
		activity: IActivityPending,
	): PromiseEither<AbstractError, IActivityPending> {
		if (!unity_id) return left(new UnityIdNotProvidedError())
		if (!activity.group_id) return left(new ActivityNotGroupIdProvider())

		const doc = await ActivityPending.create({ ...activity, unity_id })

		return right(doc)
	}
}
