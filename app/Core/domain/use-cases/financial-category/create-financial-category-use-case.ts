import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { IFinancialCategory } from 'App/Types/IFinancialCategory'
import { inject, injectable, registry } from 'tsyringe'
import FinancialCategoryEntity from '../../entities/financial-category/financial-category'
import { FinancialCategoryMongooseRepository } from '../../repositories/financial-category/financial-category-mongo-repository'
import { FinancialCategoryManagerContract } from '../../repositories/interface/financial-category-manager.interface'

@injectable()
@registry([{ token: CreateFinancialCategoryUseCase, useClass: CreateFinancialCategoryUseCase }])
export class CreateFinancialCategoryUseCase implements UseCase<IFinancialCategory, IFinancialCategory> {

    constructor(
        @inject(FinancialCategoryMongooseRepository) private readonly manager: FinancialCategoryManagerContract
    ) { } // eslint-disable-line

    public async execute(data: IFinancialCategory): PromiseEither<AbstractError, IFinancialCategory> {

        const financialCategoryOrErr = await FinancialCategoryEntity.build(data)

        if (financialCategoryOrErr.isLeft()) {
            return left(financialCategoryOrErr.extract())
        }

        const financialCategory = financialCategoryOrErr.extract()

        return await this.manager.create(financialCategory)
    }
}
