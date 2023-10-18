import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ControllerInjection } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import {
	ActivationUserUseCase,
	CreateSessionUseCase,
	CreateUserAdminUseCase,
	CreateUserUseCase,
	SignInUseCase,
} from 'App/Core/domain/use-cases'
import container from 'App/Core/shared/container'

export const makeSignInComposer = ({ auth }: HttpContextContract): ControllerGeneric => {
	const manager = new CreateSessionUseCase(auth)
	container.register('CreateSessionUseCase', { useValue: manager })
	return ControllerInjection.resolve(SignInUseCase)
}

export const makeCreateUserComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(CreateUserUseCase)
}

export const makeCreateAdminComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(CreateUserAdminUseCase)
}

export const makeActivationUserComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(ActivationUserUseCase)
}