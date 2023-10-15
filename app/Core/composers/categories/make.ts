import { ControllerInjection } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import {
	CreateCategoriesUseCase,
	DeleteCategoriesByIdUseCase,
	FindCategoriesByUnityUseCase,
	ShowCategoriesByIdUseCase,
	UpdateCategoriesByIdUseCase
} from 'App/Core/domain/use-cases'
import { IOptsQuery } from 'App/Types/IOptsQuery'

export const makeCategoriesFindByUnityComposer = (opts: IOptsQuery): ControllerGeneric => {
	return ControllerInjection.resolve(FindCategoriesByUnityUseCase, opts)
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

export const makeCategoriesDeleteByIdComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(DeleteCategoriesByIdUseCase)
}
