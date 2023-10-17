import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ControllerInjection } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { SignInUseCase } from 'App/Core/domain/use-cases'
import { SessionAuth } from 'App/Core/infra/session-auth'
import container from 'App/Core/shared/container'

export const makeSignInComposer = ({ auth }: HttpContextContract): ControllerGeneric => {
	const manager = new SessionAuth(auth)
	container.register('SessionRepository', { useValue: manager })

	return ControllerInjection.resolve(SignInUseCase)
}
