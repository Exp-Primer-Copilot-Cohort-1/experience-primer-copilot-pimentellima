import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { ActivityPayment, IActivityPending, STATUS_ACTIVITY } from 'App/Types/IActivity'
import { Generic } from 'App/Types/ITransaction'
import { z } from 'zod'
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

	type: STATUS_ACTIVITY.PENDING
	payment?: ActivityPayment
	is_recurrent: true = true

	private constructor() {
		super()
	}

	defineType(type: STATUS_ACTIVITY.PENDING = STATUS_ACTIVITY.PENDING): this {
		this.type = type
		return this
	}

	definePayment(payment?: ActivityPayment): this {
		this.payment = payment
		return this
	}

	defineIsRecurrent(is_recurrent: true = true): this {
		this.is_recurrent = is_recurrent
		return this
	}


	public static async build(
		params: IActivityPending,
	): PromiseEither<AbstractError, ActivityPendingEntity> {
		try {

			const activityPending = new ActivityPendingEntity()
				.defineId(params._id as string)
				.defineActive(params.active)
				.defineClient(params.client as string | Generic)
				.defineCreatedAt(params.created_at)
				.defineGroupId(params.group_id as string)
				.defineIsRecurrent(params.is_recurrent)
				.defineObs(params.obs)
				.definePayment(params.payment)
				.defineProf(params.prof as string | Generic)
				.defineProcedures(params.procedures)
				.defineStatus(params.status)
				.defineType(params.type)
				.defineUnityId(params.unity_id as string)
				.defineUpdatedAt(params.updated_at)

			validation.parse(activityPending)

			return right(activityPending)
		} catch (err) {
			console.log(err)
			return left(err)
		}
	}
}

export default ActivityPendingEntity
