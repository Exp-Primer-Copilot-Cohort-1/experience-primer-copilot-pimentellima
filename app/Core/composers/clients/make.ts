import { ControllerInjection } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import {
	CreateClientsUseCase,
	FindAllClientsUseCase,
	UpdateClientsByIdUseCase,
} from 'App/Core/domain/use-cases'
import { PutTreatmentPicturesUseCase } from 'App/Core/domain/use-cases/clients/put-treatment-pictures-use-case'
import { UpdateClientPictureUseCase } from 'App/Core/domain/use-cases/clients/update-client-picture-use-case'
import { IOptsQuery } from 'App/Types/IOptsQuery'

export const makeClientCreateComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(CreateClientsUseCase)
}

export const makePutTreatmentPicturesComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(PutTreatmentPicturesUseCase)
}

export const makeUpdateClientPictureComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(UpdateClientPictureUseCase)
}

export const makeClientUpdateComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(UpdateClientsByIdUseCase)
}

export const makeClientFindAllComposer = (opts: IOptsQuery): ControllerGeneric => {
	return ControllerInjection.resolve(FindAllClientsUseCase, opts)
}
