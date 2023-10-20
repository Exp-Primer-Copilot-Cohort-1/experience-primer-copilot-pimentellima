import { ControllerInjection } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { CreateFormUseCase } from 'App/Core/domain/use-cases/form/create-form-use-case'
import { FindAllFormsUseCase } from 'App/Core/domain/use-cases/form/find-all-forms-use-case'
import { FindFormByIdUseCase } from 'App/Core/domain/use-cases/form/find-form-by-id-use-case'
import { UpdateFormByIdUseCase } from 'App/Core/domain/use-cases/form/update-form-by-id-use-case'


export const makeFindAllFormsComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(FindAllFormsUseCase)
}

export const makeCreateFormComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(CreateFormUseCase)
}

export const makeUpdateFormComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(UpdateFormByIdUseCase)
}

export const makeFindFormByIdComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(FindFormByIdUseCase)
}


