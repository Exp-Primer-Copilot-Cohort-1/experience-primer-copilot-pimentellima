import { ControllerInjection } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import {
	CountsUseCase,
	CreateCategoriesUseCase,
	DeleteCategoriesByIdUseCase,
	FindCategoriesByUnityUseCase,
	ShowCategoriesByIdUseCase,
	UpdateCategoriesByIdUseCase
} from 'App/Core/domain/use-cases'
import Category from 'App/Models/Category'
import { IOptsQuery } from 'App/Types/IOptsQuery'
import { container } from 'tsyringe'

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

export const makeCategoriesCountCompose = (opts: IOptsQuery): ControllerGeneric => {
	container.registerInstance('Model', Category)
	return ControllerInjection.resolve(CountsUseCase, opts)
}