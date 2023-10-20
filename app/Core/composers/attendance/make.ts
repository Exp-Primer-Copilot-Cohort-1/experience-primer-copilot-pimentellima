import { ControllerInjection } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import {
	FinishedActivityUseCase,
	StartedActivityUseCase
} from 'App/Core/domain/use-cases'

export const makeUpdateActivityStartedAtComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(StartedActivityUseCase)
}

export const makeUpdateActivityFinishedAtComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(FinishedActivityUseCase)
}