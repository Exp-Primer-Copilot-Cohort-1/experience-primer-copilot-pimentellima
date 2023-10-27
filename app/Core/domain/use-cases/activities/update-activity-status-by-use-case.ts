import { ActivityAttendanceMongoRepository } from 'App/Core/domain/repositories'
import { ActivitiesManagerAttendanceContract } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { AppointmentStatus } from 'App/Helpers'
import { IActivity } from 'App/Types/IActivity'
import { inject, injectable, registry } from 'tsyringe'
import { IdNotProvidedError } from '../../errors'
import { ProductStockDepletionUseCase } from '../attendance/product-stock-depletion-use-case'
import { IProductStockDepletionUseCase } from '../attendance/use-cases.contract'

type Props = {
	id: string
	status: AppointmentStatus
}
@injectable()
@registry([{ token: UpdateActivityStatusByIdUseCase, useClass: UpdateActivityStatusByIdUseCase }])
export class UpdateActivityStatusByIdUseCase implements UseCase<Props, IActivity> {

	constructor(
		@inject(ActivityAttendanceMongoRepository)
		private readonly manager: ActivitiesManagerAttendanceContract,
		@inject(ProductStockDepletionUseCase)
		private readonly stockDepletionUseCase: IProductStockDepletionUseCase,
	) { } // eslint-disable-line

	public async execute({ id, status }: Props): PromiseEither<AbstractError, IActivity> {
		if (!id) return left(new IdNotProvidedError())

		if (status === AppointmentStatus.COMPLETED) {
			try {
				await this.stockDepletionUseCase.execute({ id })
			} catch (error) {
				console.log(error)
			}
		}

		return await this.manager.updateStatusById(
			id,
			status,
		)
	}
}
