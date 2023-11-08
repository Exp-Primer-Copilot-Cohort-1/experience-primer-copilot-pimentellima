import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither } from 'App/Core/shared'

import { ICostCenter } from 'App/Types/ICostCenter'
import { inject, injectable, registry } from 'tsyringe'
import { CostCenterManagerContract } from '../../repositories/cost-center/const-center-manager.interface'
import { CostCenterMongooseRepository } from '../../repositories/cost-center/cost-center-mongo-repository'

@injectable()
@registry([{ token: CreateCostCenterUseCase, useClass: CreateCostCenterUseCase }])
export class CreateCostCenterUseCase
	implements UseCase<Partial<ICostCenter>, ICostCenter>
{
	constructor(
		@inject(CostCenterMongooseRepository) private readonly manager: CostCenterManagerContract
	) { }

	public async execute(
		costCenter: Partial<ICostCenter>,
	): PromiseEither<AbstractError, ICostCenter> {
		return await this.manager.create(
			costCenter,
		)
	}
}
