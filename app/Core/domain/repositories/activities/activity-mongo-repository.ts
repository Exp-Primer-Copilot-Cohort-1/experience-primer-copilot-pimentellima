import { Document } from '@ioc:Mongoose'
import ActivityEntity from 'App/Core/domain/entities/activities/activity'
import { OptsQuery } from 'App/Core/domain/entities/helpers/opts-query'
import { ClientNotFoundError, IdNotProvidedError, UserNotFoundError } from 'App/Core/domain/errors'
import { ActivityNotFoundError } from 'App/Core/domain/errors/activity-not-found'
import { MissingParamsError } from 'App/Core/domain/errors/missing-params'
import { UnityNotFoundError } from 'App/Core/domain/errors/unity-not-found'
import { UnityIdNotProvidedError } from 'App/Core/domain/errors/unity-not-id-provider'
import { AbstractError } from 'App/Core/errors/error.interface'
import { ISessionTransaction } from 'App/Core/infra/infra'
import { SessionTransaction } from 'App/Core/infra/session-transaction'
import { PromiseEither, left, right } from 'App/Core/shared'
import Activity, { COLLECTIONS_REFS } from 'App/Models/Activity'
import { STATUS_ACTIVITY, type IActivity } from 'App/Types/IActivity'
import { inject, injectable, registry } from 'tsyringe'
import { PROJECTION_CLIENT, PROJECTION_DEFAULT } from '../helpers/projections'
import { ActivitiesManagerContract } from '../interface/activity-manager.interface'

@injectable()
@registry([{ token: ActivityMongoRepository, useClass: ActivityMongoRepository }])
export class ActivityMongoRepository implements ActivitiesManagerContract {
	constructor(
		@inject(OptsQuery) private readonly opts: OptsQuery,
		@inject(SessionTransaction) private readonly session: ISessionTransaction,
	) { } // eslint-disable-line

	async findAll(unity_id: string): PromiseEither<AbstractError, IActivity[]> {
		if (!unity_id) return left(new UnityNotFoundError())

		const activities = await Activity.find({
			unity_id,
			type: STATUS_ACTIVITY.MARKED,
		})
			.where(this.opts?.where || {})
			.populate(COLLECTIONS_REFS.CLIENTS, PROJECTION_CLIENT)
			.populate(COLLECTIONS_REFS.PROFS, PROJECTION_DEFAULT)
			.populate(COLLECTIONS_REFS.PROCEDURES, PROJECTION_DEFAULT)
			.populate(COLLECTIONS_REFS.HEALTH_INSURANCES, PROJECTION_DEFAULT)
			.sort({ date: -1 })

		return right(activities)
	}

	async findByProf(
		unity_id: string,
		prof_id: string,
	): PromiseEither<AbstractError, IActivity[]> {
		if (!unity_id) return left(new UnityNotFoundError())
		if (!prof_id) return left(new UserNotFoundError())

		const activities = await Activity.find({
			unity_id,
			prof: prof_id,
			type: STATUS_ACTIVITY.MARKED,
		})
			.populate(COLLECTIONS_REFS.CLIENTS, PROJECTION_CLIENT)
			.populate(COLLECTIONS_REFS.PROFS, PROJECTION_DEFAULT)
			.populate(COLLECTIONS_REFS.PROCEDURES, PROJECTION_DEFAULT)
			.populate(COLLECTIONS_REFS.HEALTH_INSURANCES, PROJECTION_DEFAULT)
			.sort({ date: -1 })

		return right(activities)
	}

	async findByClient(
		unity_id: string,
		client_id: string,
	): PromiseEither<AbstractError, IActivity[]> {
		if (!unity_id) return left(new UnityNotFoundError())
		if (!client_id) return left(new ClientNotFoundError())

		const activities = await Activity.find({
			unity_id,
			client: client_id,
			type: STATUS_ACTIVITY.MARKED,
		})
			.where(this.opts?.only_prof)
			.populate(COLLECTIONS_REFS.CLIENTS, PROJECTION_CLIENT)
			.populate(COLLECTIONS_REFS.PROFS, PROJECTION_DEFAULT)
			.populate(COLLECTIONS_REFS.PROCEDURES, PROJECTION_DEFAULT)
			.populate(COLLECTIONS_REFS.HEALTH_INSURANCES, PROJECTION_DEFAULT)
			.sort({ date: -1 })

		return right(activities)
	}

	async create(
		unity_id: string,
		{
			_id, // eslint-disable-line
			...params
		}: IActivity,
	): PromiseEither<AbstractError, IActivity> {
		if (!unity_id) return left(new UnityIdNotProvidedError())

		const activityOrErr = await ActivityEntity.build(params)

		if (activityOrErr.isLeft()) return left(activityOrErr.extract())
		const activity = activityOrErr.extract()

		const created = await Activity.create({
			...activity,
			unity_id,
		})

		return right(created.toObject())
	}

	async find(id: string): PromiseEither<AbstractError, IActivity> {
		if (!id) return left(new MissingParamsError('id'))

		const activity = await Activity.findById(id)
			.populate(COLLECTIONS_REFS.CLIENTS, PROJECTION_CLIENT)
			.populate(COLLECTIONS_REFS.PROFS, PROJECTION_DEFAULT)
			.populate(COLLECTIONS_REFS.PROCEDURES, PROJECTION_DEFAULT)
			.populate(COLLECTIONS_REFS.HEALTH_INSURANCES, PROJECTION_DEFAULT)
			.sort({ date: -1 })
			.orFail(new ActivityNotFoundError())

		return right(activity.toObject())
	}

	async deleteById(id: string): PromiseEither<AbstractError, IActivity> {
		if (!id) return left(new IdNotProvidedError())

		const activity = await Activity.findByIdAndDelete(id)
			.populate(COLLECTIONS_REFS.CLIENTS, PROJECTION_CLIENT)
			.populate(COLLECTIONS_REFS.PROFS, PROJECTION_DEFAULT)
			.populate(COLLECTIONS_REFS.PROCEDURES, PROJECTION_DEFAULT)
			.populate(COLLECTIONS_REFS.HEALTH_INSURANCES, PROJECTION_DEFAULT)
			.sort({ date: -1 })
			.orFail(new ActivityNotFoundError())

		return right(activity.toObject())
	}

	async updateById(
		id: string,
		values: IActivity,
	): PromiseEither<AbstractError, IActivity> {
		if (!id) return left(new ActivityNotFoundError())

		const activity = await Activity.findById(id, null, { ...this.session?.options })

		if (!activity) return left(new ActivityNotFoundError())

		const entityOrErr = await ActivityEntity.build(activity)

		if (entityOrErr.isLeft()) return left(entityOrErr.extract())

		const entity = entityOrErr.extract().update(values)

		const updated = (await Activity.findByIdAndUpdate(id, entity, {
			...this.session?.options,
			new: true,
		})) as unknown as Document

		return right(updated.toObject())
	}
}
