import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'

import { IdNotProvidedError } from 'App/Core/domain//errors'
import FinancialCategoryEntity from 'App/Core/domain/entities/financial-category/financial-category'
import { FinancialCategoryMongooseRepository } from 'App/Core/domain/repositories'
import { FinancialCategoryManagerContract } from 'App/Core/domain/repositories/interface'
import { IFinancialCategory } from 'App/Types/IFinancialCategory'
import { inject, injectable, registry } from 'tsyringe'

type In = {
	id: string
} & IFinancialCategory

@injectable()
@registry([{ token: UpdateFinancialCategoryByIdUseCase, useClass: UpdateFinancialCategoryByIdUseCase }])
export class UpdateFinancialCategoryByIdUseCase implements UseCase<IFinancialCategory, IFinancialCategory> {
	constructor(@inject(FinancialCategoryMongooseRepository) private readonly manager: FinancialCategoryManagerContract) { } // eslint-disable-line

	public async execute(
		{ id, ...data }: In,
	): PromiseEither<AbstractError, IFinancialCategory> {
		const financialCategoryOrErr = await FinancialCategoryEntity.build(data)
		if (!id) return left(new IdNotProvidedError())

		if (financialCategoryOrErr.isLeft()) return financialCategoryOrErr

		const financialCategory = financialCategoryOrErr.extract()

		return await this.manager.update(id, financialCategory)
	}
}
