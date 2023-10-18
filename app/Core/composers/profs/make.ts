import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import ControllerInjection from 'App/Core/adapters/controller/ports/controller-injection'
import getterOptInRequest from 'App/Core/domain/entities/helpers/getter-opt-in-request'
import {
	ProfsCountsUseCase,
	ProfsFindAllUseCase
} from 'App/Core/domain/use-cases'

export const makeFindAllProfsComposers = (ctx: HttpContextContract): ControllerGeneric => {
	const opts = getterOptInRequest(ctx)

	return ControllerInjection.resolve(ProfsFindAllUseCase, opts)
}


export const makeCountsProfsComposers = (ctx: HttpContextContract): ControllerGeneric => {
	const opts = getterOptInRequest(ctx)

	return ControllerInjection.resolve(ProfsCountsUseCase, opts)
}