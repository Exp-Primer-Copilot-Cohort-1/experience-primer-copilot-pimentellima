import LogDecorator, { ACTION } from 'App/Core/decorators/log-decorator'
import { ActivitiesManagerAttendanceInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { COLLECTION_NAME } from 'App/Models/Activity'
import { IActivity } from 'App/Types/IActivity'
import { TransactionWithActivity } from '../transactions/helpers'

export class UpdateActivityPaymentUseCase
	implements UseCase<TransactionWithActivity, IActivity>
{
	constructor(
		private readonly activitiesManager: ActivitiesManagerAttendanceInterface,
	) { } // eslint-disable-line

	@LogDecorator(COLLECTION_NAME, ACTION.PUT)
	public async execute({
		activity_id,
		...transaction
	}: TransactionWithActivity): PromiseEither<AbstractError, IActivity> {
		if (!activity_id)
			return left(
				new AbstractError('Id da atividade não foi passado como parâmetro', 400),
			)

		const activityOrErr = await this.activitiesManager.updateActivityPayment(
			activity_id,
			transaction,
		)

		if (activityOrErr.isLeft()) return left(activityOrErr.extract())
		const newActivity = activityOrErr.extract()
		return right(newActivity)
	}
}
