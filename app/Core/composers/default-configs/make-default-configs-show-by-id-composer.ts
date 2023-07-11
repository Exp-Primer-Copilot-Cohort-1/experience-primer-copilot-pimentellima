import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { DefaultConfigsMongooseRepository } from 'App/Core/domain/repositories'
import { ShowDefaultConfigsByUnitIdUseCase } from 'App/Core/domain/use-cases'

export const makeDefaultConfigsShowByUnityComposer = (): ControllerGeneric => {
	return new Controller(
		new ShowDefaultConfigsByUnitIdUseCase(new DefaultConfigsMongooseRepository()),
	)
}
