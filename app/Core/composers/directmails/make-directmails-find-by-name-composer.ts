import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { DirectmailsMongooseRepository } from 'App/Core/domain/repositories'
import { FindDirectmailsByNameUseCase } from 'App/Core/domain/use-cases/directmail/find-directmail-by-name-use-case/find-directmails-by-name-use-case'

export const makeDirectmailsFindByNameComposer = (): ControllerGeneric => {
	return new Controller(
		new FindDirectmailsByNameUseCase(new DirectmailsMongooseRepository()),
	)
}
