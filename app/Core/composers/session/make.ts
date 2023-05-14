import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import {
	SessionRepository,
	UnitiesMongooseRepository,
} from 'App/Core/domain/repositories'
import { SignInUseCase, UnityValidationUseCase } from 'App/Core/domain/use-cases'

export const makeSignInComposer = ({ auth }: HttpContextContract): ControllerGeneric => {
	return new Controller(
		new SignInUseCase(
			new SessionRepository(auth),
			new UnitiesMongooseRepository(),
			new UnityValidationUseCase(new UnitiesMongooseRepository()),
		),
	)
}
