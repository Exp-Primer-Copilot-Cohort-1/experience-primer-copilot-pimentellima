import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'

import { ProceduresMongooseRepository } from 'App/Core/domain/repositories'
import { ProceduresManagerContract } from 'App/Core/domain/repositories/interface'
import { IProcedure } from 'App/Types/IProcedure'
import { inject, injectable, registry } from 'tsyringe'
import { IdNotProvidedError } from '../../errors'
import { ManagerStockProps } from './add-product-in-procedure-use-case'

@injectable()
@registry([{ token: RemoveProductInProcedureUseCase, useClass: RemoveProductInProcedureUseCase }])
export class RemoveProductInProcedureUseCase implements UseCase<ManagerStockProps, IProcedure> {

	constructor(
		@inject(ProceduresMongooseRepository) private readonly manager: ProceduresManagerContract
	) { } // eslint-disable-line

	public async execute(
		{
			id,
			product
		}: ManagerStockProps,
	): PromiseEither<AbstractError, IProcedure> {
		if (!id) return left(new IdNotProvidedError())

		return await this.manager.removeProduct(id, product)
	}
}
