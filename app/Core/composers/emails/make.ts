import { ControllerInjection } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import {
	ResendActivationUseCase,
} from 'App/Core/domain/use-cases'

export const makeResendActivationComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(ResendActivationUseCase)
}
