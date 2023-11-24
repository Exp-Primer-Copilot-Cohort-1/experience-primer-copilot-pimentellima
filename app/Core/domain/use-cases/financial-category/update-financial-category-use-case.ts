import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'

import { MissingParamsError } from 'App/Core/domain/errors/missing-params'
import { IFinancialCategory } from 'App/Types/IFinancialCategory'
import { inject, injectable, registry } from 'tsyringe'
import FinancialCategoryEntity from '../../entities/financial-category/financial-category'
import { FinancialCategoryMongooseRepository } from '../../repositories/financial-category/financial-category-mongo-repository'
import { FinancialCategoryManagerContract } from '../../repositories/interface/financial-category-manager.interface'

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
        /* const financialCategoryOrErr = await FinancialCategoryEntity.build(data) */
        if (!id) {
            return left(new MissingParamsError('_id'))
        }
/*         if (financialCategoryOrErr.isLeft()) {
            return left(financialCategoryOrErr.extract())
        }

        const financialCategory = financialCategoryOrErr.extract() */

        return await this.manager.update(id, data)
    }
}
