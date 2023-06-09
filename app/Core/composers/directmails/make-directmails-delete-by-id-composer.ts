import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { DirectmailsMongooseRepository } from 'App/Core/domain/repositories'
import { DeleteDirectmailsByIdUseCase } from 'App/Core/domain/use-cases'

export const makeDirectmailsDeleteByIdComposer = (): ControllerGeneric => {
	return new Controller(
		new DeleteDirectmailsByIdUseCase(new DirectmailsMongooseRepository()),
	)
}
