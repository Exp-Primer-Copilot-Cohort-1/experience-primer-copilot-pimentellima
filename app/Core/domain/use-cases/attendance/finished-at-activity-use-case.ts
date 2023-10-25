import { IdNotProvidedError } from 'App/Core/domain/errors/id-not-provided'
import { ActivityAttendanceMongoRepository } from 'App/Core/domain/repositories'
import {
	ActivitiesManagerAttendanceContract
} from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { IActivity } from 'App/Types/IActivity'
import { inject, injectable, registry } from 'tsyringe'
import { ProductStockDepletionUseCase } from './product-stock-depletion-use-case'
import { IProductStockDepletionUseCase } from './use-cases.contract'

type In = {
	id: string
	finished_at: Date
}

@injectable()
@registry([{ token: FinishedActivityUseCase, useClass: FinishedActivityUseCase }])
export class FinishedActivityUseCase implements UseCase<In, IActivity> {

	constructor(
		@inject(ActivityAttendanceMongoRepository)
		private readonly manager: ActivitiesManagerAttendanceContract,
		@inject(ProductStockDepletionUseCase)
		private readonly stockDepletionUseCase: IProductStockDepletionUseCase,
	) { } // eslint-disable-line

	public async execute({ finished_at, id }: In): PromiseEither<AbstractError, IActivity> {
		if (!id) return left(new IdNotProvidedError())

		await this.stockDepletionUseCase.execute({ id })

		return await this.manager.stopActivity(id, finished_at)
	}
}
