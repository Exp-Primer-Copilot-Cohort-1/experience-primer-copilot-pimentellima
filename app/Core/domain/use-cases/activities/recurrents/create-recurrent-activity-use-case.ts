import ActivityEntity from 'App/Core/domain/entities/activities/activity'
import { ActivityPendingEntity } from 'App/Core/domain/entities/activity-pending'
import { UnityIdNotProvidedError } from 'App/Core/domain/errors/unity-not-id-provider'
import { ActivityMongoRepository, ActivityRecurrentMongoRepository } from 'App/Core/domain/repositories'
import { ActivitiesManagerContract, ActivitiesRecurrentManagerContract } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { makeObjectId } from 'App/Core/infra/create-id'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IActivity, RecurrentActivityValues } from 'App/Types/IActivity'
import { inject, injectable, registry } from 'tsyringe'
@injectable()
@registry([{ token: CreateRecurrentActivityUseCase, useClass: CreateRecurrentActivityUseCase }])
export class CreateRecurrentActivityUseCase implements UseCase<RecurrentActivityValues, IActivity[]> {
	constructor(
		@inject(ActivityRecurrentMongoRepository)
		private readonly managerRecurrent: ActivitiesRecurrentManagerContract,
		@inject(ActivityMongoRepository)
		private readonly managerMarked: ActivitiesManagerContract,
	) { } // eslint-disable-line

	public async execute({ unity_id, dates, ...activity }: RecurrentActivityValues): PromiseEither<AbstractError, IActivity[]> {
		if (!unity_id) return left(new UnityIdNotProvidedError())

		const group_id = makeObjectId()

		const validatedActivities: IActivity[] = []

		for (let i = 0; i < dates.length; i++) {
			const date = dates[i]

			const activityOrErr = await ActivityEntity.build({
				...date,
				...activity,
				group_id,
				unity_id,
			})

			if (activityOrErr.isLeft()) throw left(activityOrErr.extract())

			validatedActivities.push(activityOrErr.extract())
		}

		const pendingActivityOrErr = await ActivityPendingEntity.build({
			...activity,
			unity_id,
			group_id,
		})

		if (pendingActivityOrErr.isLeft()) return left(pendingActivityOrErr.extract())

		const pendingActivity = pendingActivityOrErr.extract()

		const recurrences = activity.recurrences - activity.schedulings

		const promisePending = Promise.all(
			new Array(recurrences).fill(0).map(async () => {
				return await this.managerRecurrent.create(unity_id, pendingActivity)
			}),
		)

		const promiseScheduled = Promise.all(
			validatedActivities?.map(
				async (activity) => {
					const doc = await this.managerMarked.create(unity_id, {
						...activity,
						group_id,
					})

					if (doc.isLeft()) throw doc.extract()

					return doc.extract()

				}
			),
		)

		const [scheduledActivities] = await Promise.all([promiseScheduled, promisePending])

		return right(scheduledActivities)

	}
}
