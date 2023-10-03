import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import {
	SessionRepository,
	UnitiesMongooseRepository,
} from 'App/Core/domain/repositories'
import { SignInUseCase, UnityValidationUseCase } from 'App/Core/domain/use-cases'
import { SessionAuth } from 'App/Core/infra/session-auth'
import { SessionTransaction } from 'App/Core/infra/session-transaction'

export const makeSignInComposer = ({ auth }: HttpContextContract): ControllerGeneric => {
	const session = new SessionTransaction()
	const manager = new SessionAuth(auth)

	return new Controller(
		new SignInUseCase(
			new SessionRepository(manager),
			new UnitiesMongooseRepository(session),
			new UnityValidationUseCase(new UnitiesMongooseRepository(session)),
		),
	)
}
