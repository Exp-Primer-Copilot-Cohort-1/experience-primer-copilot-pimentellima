import ActivityAwaitEntity from 'App/Core/domain/entities/activity-await/activity-await'
import { ActivityNotFoundError, MarkedActivityError } from 'App/Core/domain/errors/activity-not-found'
import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import ActivityAwait, { COLLECTION_REFS } from 'App/Models/ActivityAwait'
import { IActivity, IActivityAwait, STATUS_ACTIVITY } from 'App/Types/IActivity'
import { generateScores } from '../helpers/scores'
import { ActivityAwaitManagerContract } from './activity-await-manager-interface'

import { OptsQuery } from 'App/Core/domain/entities/helpers/opts-query'
import Activity from 'App/Models/Activity'
import { Generic } from 'App/Types/ITransaction'
import { inject, injectable, registry } from 'tsyringe'
import { PROJECTION_CLIENT, PROJECTION_DEFAULT } from '../helpers/projections'
@injectable()
@registry([{ token: ActivityAwaitMongoRepository, useClass: ActivityAwaitMongoRepository }])
export class ActivityAwaitMongoRepository implements ActivityAwaitManagerContract {

	constructor(
		@inject(OptsQuery) private readonly opts: OptsQuery
	) { } // eslint-disable-line

	async marked(id: string, activity: IActivity): PromiseEither<AbstractError, IActivity> {
		if (!id) return left(new ActivityNotFoundError())

		const doc = await Activity.findByIdAndUpdate(
			id,
			{ $set: { ...activity, type: STATUS_ACTIVITY.MARKED } },
			{ new: true }
		).orFail(new MarkedActivityError())

		return right(doc)
	}

	async create(
		activity: IActivityAwait,
	): PromiseEither<AbstractError, IActivityAwait> {
		const created = await ActivityAwait.create(activity)

		return right(created)
	}

	async findAll(): PromiseEither<AbstractError, IActivityAwait[]> {

		const scoreMap = await generateScores(this.opts.unity_id)

		const activities = await ActivityAwait.find({
			type: 'await',
		})
			.where(this.opts.where)
			.populate(COLLECTION_REFS.CLIENTS, PROJECTION_CLIENT)
			.populate(COLLECTION_REFS.PROFS, PROJECTION_DEFAULT)
			.populate(COLLECTION_REFS.HEALTH_INSURANCE, PROJECTION_DEFAULT)
			.populate(COLLECTION_REFS.PROCEDURES, PROJECTION_DEFAULT)

		// Adiciona a pontuação de cada cliente
		for (const activity of activities) {
			activity.score = scoreMap[(activity.client as Generic).value] || 0
		}

		return right(activities)
	}

	async updateById(
		id: string,
		activity: IActivityAwait,
	): PromiseEither<AbstractError, IActivityAwait> {
		const oldActivity = await ActivityAwait.findById(id)
		if (!oldActivity) return left(new ActivityNotFoundError())
		const activityOrErr = await ActivityAwaitEntity.build(activity as any)
		if (activityOrErr.isLeft()) return left(activityOrErr.extract())

		const updatedActivity = await ActivityAwait.findByIdAndUpdate(
			id,
			activityOrErr.extract().params(),
		)
		if (!updatedActivity)
			return left(new AbstractError('Error updating activity', 500))
		return right(updatedActivity)
	}

}
