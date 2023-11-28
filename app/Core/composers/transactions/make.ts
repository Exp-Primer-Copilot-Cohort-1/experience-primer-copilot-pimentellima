import { ControllerInjection } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import {
	CreateTransactionUseCase,
	UpdateTransactionUseCase
} from 'App/Core/domain/use-cases'

export const makeCreateTransactionComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(CreateTransactionUseCase)
}

export const makeUpdateTransactionComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(UpdateTransactionUseCase)
}