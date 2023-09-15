/* eslint-disable @typescript-eslint/naming-convention */

import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import {
	ActivityPayment,
	ActivityPendingValues,
	IActivityPending,
	STATUS_ACTIVITY,
} from 'App/Types/IActivity'
import * as z from 'zod'
import { AbstractActivity } from '../abstract/activity-abstract'

const validation = z.object({
	prof: z.string(),
	client: z.string(),
	procedures: z.array(
		z.object({
			_id: z.string(),
		}),
	),
	obs: z.string().optional(),
	unity_id: z.string(),
})

export class ActivityPendingEntity extends AbstractActivity implements IActivityPending {
	payment?: ActivityPayment
	type: STATUS_ACTIVITY.PENDING
	group_id: string

	defineGroupId(group_id: string): ActivityPendingEntity {
		this.group_id = group_id
		return this
	}

	defineType(type: STATUS_ACTIVITY.PENDING): ActivityPendingEntity {
		this.type = type
		return this
	}

	definePayment(payment: ActivityPayment): ActivityPendingEntity {
		this.payment = payment
		return this
	}

	public static async build(
		params: ActivityPendingValues & { group_id: string },
	): PromiseEither<AbstractError, ActivityPendingEntity> {
		console.log(params)
		try {
			const activityPending = new ActivityPendingEntity()
				.defineProcedures(params.procedures)
				.defineClient(params.client)
				.defineType(STATUS_ACTIVITY.PENDING)
				.defineObs(params.obs)
				.defineProf(params.prof)
				.defineActive(true)
				.defineUnityId(params.unity_id?.toString())
				.defineGroupId(params.group_id)
			validation.parse(activityPending)

			return right(activityPending)
		} catch (err) {
			console.log(err)
			return left(err)
		}
	}
}

export default ActivityPendingEntity
