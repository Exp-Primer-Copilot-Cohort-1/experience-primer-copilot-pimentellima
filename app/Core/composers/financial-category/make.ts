import { ControllerInjection } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { CreateFinancialCategoryUseCase, FindAllFinancialCategoryByUnityUseCase, UpdateFinancialCategoryByIdUseCase } from 'App/Core/domain/use-cases'
import { FindFinancialCategoryByIdUseCase } from 'App/Core/domain/use-cases/financial-category/find-financial-category-by-id-use-case'
import { IOptsQuery } from 'App/Types/IOptsQuery'

export const makeFinancialCategoryFindAllComposer = (opts: IOptsQuery): ControllerGeneric => {
    return ControllerInjection.resolve(FindAllFinancialCategoryByUnityUseCase, opts)
}

export const makeFinancialCategoryCreateComposer = (): ControllerGeneric => {
    return ControllerInjection.resolve(CreateFinancialCategoryUseCase)
};

export const makeFinancialCategoryUpdateComposer = (): ControllerGeneric => {
    return ControllerInjection.resolve(UpdateFinancialCategoryByIdUseCase)
};


export const makeFinancialCategoryFindByIdComposer = (): ControllerGeneric => {
    return ControllerInjection.resolve(FindFinancialCategoryByIdUseCase)
};