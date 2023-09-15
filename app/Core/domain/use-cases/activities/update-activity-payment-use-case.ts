import { ActivitiesManagerAttendanceInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { IActivity } from 'App/Types/IActivity'
import { ActivityNotFoundError } from '../../errors'
import { TransactionWithActivity } from '../transactions/helpers'

export class UpdateActivityPaymentUseCase
	implements UseCase<TransactionWithActivity, IActivity>
{
	constructor(
		private readonly activitiesManager: ActivitiesManagerAttendanceInterface,
	) { } // eslint-disable-line

	public async execute({
		activity_id,
		...transaction
	}: TransactionWithActivity): PromiseEither<AbstractError, IActivity> {
		if (!activity_id) return left(new ActivityNotFoundError())

		const activityOrErr = await this.activitiesManager.updateActivityPayment(
			activity_id,
			transaction,
		)

		return activityOrErr
	}
}
