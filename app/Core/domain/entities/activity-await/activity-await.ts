/* eslint-disable @typescript-eslint/naming-convention */

import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IActivityAwait, STATUS_ACTIVITY } from 'App/Types/IActivity'
import * as z from 'zod'
import { AbstractActivity } from '../abstract/activity-abstract'

const validation = z.object({
	prof: z.string(),
	client: z.string(),
	procedures: z.array(
		z.object({
			_id: z.string(),
			minutes: z.number(),
			color: z.string(),
			price: z.number(),
			health_insurance: z.string().optional(),
		}),
	),
	obs: z.string().optional(),
	unity_id: z.string(),
})

export class ActivityAwaitEntity extends AbstractActivity implements IActivityAwait {
	type: STATUS_ACTIVITY.AWAIT

	defineType(type: STATUS_ACTIVITY.AWAIT): ActivityAwaitEntity {
		this.type = type
		return this
	}

	public static async build(
		params: IActivityAwait,
	): PromiseEither<AbstractError, ActivityAwaitEntity> {
		try {
			const activityAwait = new ActivityAwaitEntity()
				.defineId(params._id as string)
				.defineProcedures(params.procedures)
				.defineClient(params.client as string)
				.defineObs(params.obs)
				.defineType(STATUS_ACTIVITY.AWAIT)
				.defineProf(params.prof as string)
				.defineActive(true)
				.defineUnityId(params.unity_id as string)

			validation.parse(activityAwait)

			return right(activityAwait)
		} catch (err) {
			console.log(err)
			return left(err)
		}
	}
}

export default ActivityAwaitEntity
