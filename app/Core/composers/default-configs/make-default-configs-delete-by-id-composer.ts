import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { DefaultConfigsMongooseRepository } from 'App/Core/domain/repositories'
import {
	DeleteDefaultConfigsByIdUseCase
} from 'App/Core/domain/use-cases'

export const makeDefaultConfigsDeleteByIdComposer = (): ControllerGeneric => {
	return new Controller(
		new DeleteDefaultConfigsByIdUseCase(new DefaultConfigsMongooseRepository()),
	)
}
