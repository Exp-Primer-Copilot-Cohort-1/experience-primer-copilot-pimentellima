import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { ClientsMongooseRepository } from 'App/Core/domain/repositories'
import { CreateClientsUseCase, UpdateClientsByIdUseCase } from 'App/Core/domain/use-cases'

export const makeClientCreateComposer = (): ControllerGeneric => {
	return new Controller(new CreateClientsUseCase(new ClientsMongooseRepository()))
}

export const makeClientUpdateComposer = (): ControllerGeneric => {
	return new Controller(new UpdateClientsByIdUseCase(new ClientsMongooseRepository()))
}
