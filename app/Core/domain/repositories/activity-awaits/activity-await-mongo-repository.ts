import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import ActivityAwait, { COLLECTION_REFS } from 'App/Models/ActivityAwait'
import { IActivityAwait } from 'App/Types/IActivity'
import ActivityAwaitEntity from '../../entities/activity-await/activity-await'
import { ActivityNotFoundError } from '../../errors/activity-not-found'
import { MissingParamsError } from '../../errors/missing-params'
import { generateScores } from '../helpers/scores'
import { ActivityAwaitManagerInterface } from '../interface/activity-await-manager-interface'

import { Generic } from 'App/Types/ITransaction'
import { Types } from 'mongoose'
import { PROJECTION_CLIENT, PROJECTION_DEFAULT } from '../helpers/projections'

export class ActivityAwaitMongoRepository implements ActivityAwaitManagerInterface {
	constructor() { } // eslint-disable-line

	async createActivity(
		unity_id: string,
		values: IActivityAwait,
	): PromiseEither<AbstractError, IActivityAwait> {
		const activityOrErr = await ActivityAwaitEntity.build({
			...values,
			unity_id,
		})

		if (activityOrErr.isLeft()) return left(activityOrErr.extract())

		const activity = activityOrErr.extract()

		const created = await ActivityAwait.create(activity)

		return right(created)
	}

	async findAllActivities(
		unity_id: string,
		...args: any[]
	): PromiseEither<AbstractError, IActivityAwait[]> {
		if (!unity_id) return left(new MissingParamsError('unity id'))

		const id = new Types.ObjectId(unity_id)
		const attrs = (args[0] as { [key: string]: string }) || {}

		const scoreMap = await generateScores(id as any)

		const activities = await ActivityAwait.find({
			...attrs,
			type: 'await',
			unity_id: id,
		})
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

	async updateActivityById(
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

	async findActivityById(id: string): PromiseEither<AbstractError, IActivityAwait> {
		if (!id) return left(new ActivityNotFoundError())

		const activity = await ActivityAwait.findById(id)
			.populate(COLLECTION_REFS.CLIENTS, PROJECTION_CLIENT)
			.populate(COLLECTION_REFS.PROFS, PROJECTION_DEFAULT)
			.populate(COLLECTION_REFS.HEALTH_INSURANCE, PROJECTION_DEFAULT)
			.populate(COLLECTION_REFS.PROCEDURES, PROJECTION_DEFAULT)

		if (!activity) return left(new ActivityNotFoundError())

		return right(activity)
	}

	async deleteActivityById(id: string): PromiseEither<AbstractError, IActivityAwait> {
		if (!id) return left(new MissingParamsError('id'))

		const activity = await ActivityAwait.findByIdAndDelete(id)
		if (!activity) return left(new ActivityNotFoundError())

		return right(activity)
	}
}
