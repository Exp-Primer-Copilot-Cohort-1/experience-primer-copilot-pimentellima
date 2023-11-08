import { ControllerInjection } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import {
	CreateClientsUseCase,
	FindAllClientsUseCase,
	UpdateClientsByIdUseCase,
} from 'App/Core/domain/use-cases'
import { IOptsQuery } from 'App/Types/IOptsQuery'

export const makeClientCreateComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(CreateClientsUseCase)
}

export const makeClientUpdateComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(UpdateClientsByIdUseCase)
}

export const makeClientFindAllComposer = (opts: IOptsQuery): ControllerGeneric => {
	return ControllerInjection.resolve(FindAllClientsUseCase, opts)
}

