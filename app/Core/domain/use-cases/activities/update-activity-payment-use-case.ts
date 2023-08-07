import { ActivitiesManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IActivity } from 'Types/IActivity'
import { TransactionWithActivity } from '../transactions/helpers'

export class UpdateActivityPaymentUseCase
	implements UseCase<TransactionWithActivity, IActivity>
{
	constructor(private readonly activitiesManager: ActivitiesManagerInterface) { }

	public async execute(
		params: TransactionWithActivity,
	): PromiseEither<AbstractError, IActivity> {
		const { activity_id, unity_id, ...transaction } = params
		const activityOrErr = await this.activitiesManager.updateActivityPayment(
			activity_id,
			unity_id,
			transaction,
		)

		if (activityOrErr.isLeft()) return left(activityOrErr.extract())
		const newActivity = activityOrErr.extract()
		return right(newActivity)
	}
}
