import { ControllerInjection } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import getterOptInRequest from 'App/Core/domain/entities/helpers/getter-opt-in-request'

import {
	CreateCategoriesUseCase,
	DeleteCategoriesByIdUseCase,
	FindAllCategoriesUseCase,
	ShowCategoriesByIdUseCase,
	UpdateCategoriesByIdUseCase
} from 'App/Core/domain/use-cases'
import { HttpContextContract } from 'App/Types/helpers'

export const makeCategoriesFindByUnityComposer = (ctx: HttpContextContract): ControllerGeneric => {
	const opts = getterOptInRequest(ctx)
	return ControllerInjection.resolve(FindAllCategoriesUseCase, opts)
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
