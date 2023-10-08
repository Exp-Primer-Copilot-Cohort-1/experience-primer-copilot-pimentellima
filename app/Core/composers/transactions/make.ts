import { ControllerInjection } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import {
	CreateTransactionUseCase
} from 'App/Core/domain/use-cases'

export const makeCreateTransactionComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(CreateTransactionUseCase)
}
