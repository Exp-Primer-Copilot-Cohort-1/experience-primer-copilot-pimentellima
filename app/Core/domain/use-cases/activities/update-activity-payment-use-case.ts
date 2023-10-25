import { ActivityNotFoundError } from 'App/Core/domain/errors'
import { ActivityAttendanceMongoRepository } from 'App/Core/domain/repositories'
import { ActivitiesManagerAttendanceContract } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { IActivity } from 'App/Types/IActivity'
import { inject, injectable, registry } from 'tsyringe'
import { TransactionWithActivity } from '../transactions/helpers'

@injectable()
@registry([{ token: UpdateActivityPaymentUseCase, useClass: UpdateActivityPaymentUseCase }])
export class UpdateActivityPaymentUseCase
	implements UseCase<TransactionWithActivity, IActivity>
{
	constructor(
		@inject(ActivityAttendanceMongoRepository) private readonly manager: ActivitiesManagerAttendanceContract,
	) { } // eslint-disable-line

	public async execute({
		activity_id,
		...transaction
	}: TransactionWithActivity): PromiseEither<AbstractError, IActivity> {
		if (!activity_id) return left(new ActivityNotFoundError())

		return await this.manager.updatePayment(
			activity_id,
			transaction,
		)
	}
}
