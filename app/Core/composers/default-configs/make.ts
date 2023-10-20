import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ControllerInjection } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import getterOptInRequest from 'App/Core/domain/entities/helpers/getter-opt-in-request'
import {
	ShowDefaultConfigsByUnitIdUseCase,
	UpdateDefaultConfigsByIdUseCase
} from 'App/Core/domain/use-cases'

export const makeDefaultConfigsCreateComposer = (ctx: HttpContextContract): ControllerGeneric => {
	const opts = getterOptInRequest(ctx)
	return ControllerInjection.resolve(UpdateDefaultConfigsByIdUseCase, opts)
}

export const makeDefaultConfigsShowByUnityComposer = (ctx: HttpContextContract): ControllerGeneric => {
	const opts = getterOptInRequest(ctx)
	return ControllerInjection.resolve(ShowDefaultConfigsByUnitIdUseCase, opts)
}

export const makeDefaultConfigsUpdateByIdComposer = (ctx: HttpContextContract): ControllerGeneric => {
	const opts = getterOptInRequest(ctx)
	return ControllerInjection.resolve(UpdateDefaultConfigsByIdUseCase, opts)
}
