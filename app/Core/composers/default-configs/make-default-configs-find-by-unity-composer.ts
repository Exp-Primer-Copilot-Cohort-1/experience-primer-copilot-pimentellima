import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { DefaultConfigsMongooseRepository } from 'App/Core/domain/repositories'
import { FindDefaultConfigByUnityUseCase } from 'App/Core/domain/use-cases'

export const makeDefaultConfigsFindByUnityComposer = (): ControllerGeneric => {
	return new Controller(
		new FindDefaultConfigByUnityUseCase(new DefaultConfigsMongooseRepository()),
	)
}
