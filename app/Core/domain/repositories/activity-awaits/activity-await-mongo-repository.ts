import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import ActivityAwait from 'App/Models/ActivityAwait'
import { IActivityAwait } from 'App/Types/IActivity'
import ActivityAwaitEntity from '../../entities/activity-await/activity-await'
import { ActivityNotFoundError } from '../../errors/activity-not-found'
import { MissingParamsError } from '../../errors/missing-params'
import { generateScores } from '../helpers/scores'
import { ActivityAwaitManagerInterface } from '../interface/activity-await-manager-interface'

import { Types } from 'mongoose'

export class ActivityAwaitMongoRepository implements ActivityAwaitManagerInterface {
	constructor() { }

	async createActivity(
		unity_id: string,
		values: IActivityAwait,
	): PromiseEither<AbstractError, IActivityAwait> {
		const activityOrErr = await ActivityAwaitEntity.build(values as any)
		if (activityOrErr.isLeft()) return left(activityOrErr.extract())

		const newActivity = await ActivityAwait.create(
			activityOrErr.extract().defineUnityId(unity_id).params(),
		)
		return right(newActivity)
	}

	async findAllActivities(
		unity_id: string,
		...args: any[]
	): PromiseEither<AbstractError, IActivityAwait[]> {
		if (!unity_id) return left(new MissingParamsError('unity id'))

		const id = new Types.ObjectId(unity_id)
		const attrs = (args[0] as { [key: string]: string }) || {}

		const scoreMap = await generateScores(id as any)

		const activities = await ActivityAwait.aggregate([
			{
				$match: {
					...attrs,
					type: 'await',
					unity_id: id,
				},
			},
		])

		// Adiciona a pontuação de cada cliente
		for (const activity of activities) {
			activity.score = scoreMap[activity.client.value] || 0
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
		if (!id) return left(new MissingParamsError('id'))

		const activity = await ActivityAwait.findById(id)
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
