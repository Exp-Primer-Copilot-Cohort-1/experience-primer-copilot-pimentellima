import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { DefaultConfigsMongooseRepository } from 'App/Core/domain/repositories'
import {
	UpdateDefaultConfigsByIdUseCase
} from 'App/Core/domain/use-cases'

export const makeDefaultConfigsUpdateByIdComposer = (): ControllerGeneric => {
	return new Controller(
		new UpdateDefaultConfigsByIdUseCase(new DefaultConfigsMongooseRepository()),
	)
}
