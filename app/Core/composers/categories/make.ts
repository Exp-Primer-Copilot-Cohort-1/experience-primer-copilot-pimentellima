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
import { container } from 'tsyringe'

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

export const makeCategoriesDeleteByIdComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(DeleteCategoriesByIdUseCase)
}

export const makeCountCategoriesCompose = (): ControllerGeneric => {
	container.registerInstance('Model', Category)
	return ControllerInjection.resolve(CountsUseCase)
}