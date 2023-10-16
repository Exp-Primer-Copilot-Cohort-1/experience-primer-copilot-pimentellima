import { ControllerInjection } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import {
	CreateUserAdminUseCase,
	CreateUserUseCase
} from 'App/Core/domain/use-cases'


export const makeCreateUserComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(CreateUserUseCase)
}

export const makeCreateAdminComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(CreateUserAdminUseCase)
}
