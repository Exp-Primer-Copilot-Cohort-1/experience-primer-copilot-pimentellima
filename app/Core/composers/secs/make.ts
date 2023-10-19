import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import ControllerInjection from 'App/Core/adapters/controller/ports/controller-injection'
import getterOptInRequest from 'App/Core/domain/entities/helpers/getter-opt-in-request'
import {
	SecsCountsUseCase,
	SecsFindAllUseCase
} from 'App/Core/domain/use-cases'

export const makeFindAllSecsComposers = (ctx: HttpContextContract): ControllerGeneric => {
	const opts = getterOptInRequest(ctx)

	return ControllerInjection.resolve(SecsFindAllUseCase, opts)
}


export const makeCountsSecsComposers = (ctx: HttpContextContract): ControllerGeneric => {
	const opts = getterOptInRequest(ctx)

	return ControllerInjection.resolve(SecsCountsUseCase, opts)
}