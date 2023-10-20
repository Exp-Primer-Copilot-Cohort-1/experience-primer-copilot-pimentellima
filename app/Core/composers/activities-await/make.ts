import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ControllerInjection } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import getterOptInRequest from 'App/Core/domain/entities/helpers/getter-opt-in-request'
import {
	CreateActivityAwaitUseCase,
	FindAllActivitiesAwaitUseCase
} from 'App/Core/domain/use-cases'

export const makeCreateActivityAwaitComposer = (ctx: HttpContextContract): ControllerGeneric => {
	const opts = getterOptInRequest(ctx)

	return ControllerInjection.resolve(CreateActivityAwaitUseCase, opts)
}

export const makeFindAllActivitiesAwaitComposer = (ctx: HttpContextContract): ControllerGeneric => {
	const opts = getterOptInRequest(ctx)

	return ControllerInjection.resolve(FindAllActivitiesAwaitUseCase, opts)
}
