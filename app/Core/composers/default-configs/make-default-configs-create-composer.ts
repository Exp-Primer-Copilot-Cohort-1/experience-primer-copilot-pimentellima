import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { DefaultConfigsMongooseRepository } from 'App/Core/domain/repositories'
import { CreateDefaultConfigsUseCase } from 'App/Core/domain/use-cases'

export const makeDefaultConfigsCreateComposer = (): ControllerGeneric => {
	return new Controller(
		new CreateDefaultConfigsUseCase(new DefaultConfigsMongooseRepository()),
	)
}
