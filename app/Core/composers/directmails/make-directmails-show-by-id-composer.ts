import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { DirectmailsMongooseRepository } from 'App/Core/domain/repositories'
import { ShowDirectmailsByIdUseCase } from 'App/Core/domain/use-cases'

export const makeDirectmailsShowByIdComposer = (): ControllerGeneric => {
	return new Controller(
		new ShowDirectmailsByIdUseCase(new DirectmailsMongooseRepository()),
	)
}
