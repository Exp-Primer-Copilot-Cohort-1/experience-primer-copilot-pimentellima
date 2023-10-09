import { ControllerInjection } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { FindCategoriesByUnityUseCase, ShowCategoriesByIdUseCase, UpdateCategoriesByIdUseCase } from 'App/Core/domain/use-cases/categories'

import { CreateCategoriesUseCase } from 'App/Core/domain/use-cases/categories'


export const makeCategoriesFindByUnityComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(FindCategoriesByUnityUseCase)
}

export const makeCategoriesShowByIdComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(ShowCategoriesByIdUseCase)
}

export const makeCategoriesCreateComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(CreateCategoriesUseCase)
}

export const makeCategoriesUpdateByIdComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(UpdateCategoriesByIdUseCase)
}
