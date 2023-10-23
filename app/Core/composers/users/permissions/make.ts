import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import ControllerInjection from 'App/Core/adapters/controller/ports/controller-injection'
import getterOptInRequest from 'App/Core/domain/entities/helpers/getter-opt-in-request'
import {
	PermissionsFindUseCase,
	PermissionsUpdateUseCase
} from 'App/Core/domain/use-cases'

export const makeFindPermissionsComposers = (ctx: HttpContextContract): ControllerGeneric => {
	const opts = getterOptInRequest(ctx)

	return ControllerInjection.resolve(PermissionsFindUseCase, opts)
}


export const makeUpdatePermissionsComposers = (ctx: HttpContextContract): ControllerGeneric => {
	const opts = getterOptInRequest(ctx)

	return ControllerInjection.resolve(PermissionsUpdateUseCase, opts)
}