import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { FinancialCategoryMongooseRepository } from 'App/Core/domain/repositories/financial-category/financial-category-mongo-repository'
import { FindAllFinancialCategoryByUnityUseCase } from 'App/Core/domain/use-cases'

export const makeFinancialCategoryFindAllComposer = (): ControllerGeneric => {
    return new Controller(
        new FindAllFinancialCategoryByUnityUseCase(new FinancialCategoryMongooseRepository()),
    )
}
