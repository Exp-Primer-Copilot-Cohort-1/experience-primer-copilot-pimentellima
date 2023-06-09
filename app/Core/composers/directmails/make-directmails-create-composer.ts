import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { DirectmailsMongooseRepository } from 'App/Core/domain/repositories'
import { CreateDirectmailsUseCase } from 'App/Core/domain/use-cases'

export const makeDirectmailsCreateComposer = (): ControllerGeneric => {
	return new Controller(
		new CreateDirectmailsUseCase(new DirectmailsMongooseRepository()),
	)
}
