import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import ControllerInjection from 'App/Core/adapters/controller/ports/controller-injection'
import {
	CreateRFormsStandardFUseCase
} from 'App/Core/domain/use-cases/reply-form-standard-franchises'

export const makeCreateRFormsStandardFUseCase = (): ControllerGeneric => {
	return ControllerInjection.resolve(CreateRFormsStandardFUseCase)
}