import { ControllerInjection } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import {
	CreateActivityUseCase,
	CreateRecurrentActivityUseCase,
	DeleteActivityByIdUseCase,
	FindActivitiesByClientIdUseCase,
	FindActivitiesByProfIdUseCase,
	FindActivityByIdUseCase,
	FindAllActivitiesPendingUseCase,
	FindAllActivitiesUseCase,
	FindDayActivitiesUseCase,
	UpdateActivityByIdUseCase,
	UpdateActivityPaymentUseCase,
	UpdateActivityStatusByIdUseCase,
} from 'App/Core/domain/use-cases'

import { IOptsQuery } from 'App/Types/IOptsQuery'

export const makeCreateActivityComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(CreateActivityUseCase)
}

export const makeUpdateActivityPaymentComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(UpdateActivityPaymentUseCase)
}
export const makeCreateRecurrentActivityComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(CreateRecurrentActivityUseCase)
}

export const makeDeleteActivityByIdComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(DeleteActivityByIdUseCase)
}
export const makeFindActivityByClientIdComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(FindActivitiesByClientIdUseCase)
}
export const makeFindActivityByIdComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(FindActivityByIdUseCase)
}

export const makeFindDayActivitiesComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(FindDayActivitiesUseCase)
}

export const makeFindActivitiesByProfIdComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(FindActivitiesByProfIdUseCase)
}

export const makeFindAllActivitiesComposer = (opts: IOptsQuery): ControllerGeneric => {
	return ControllerInjection.resolve(FindAllActivitiesUseCase, opts)
}

export const makeFindAllActivitiesPendingComposer = (opts: IOptsQuery): ControllerGeneric => {
	return ControllerInjection.resolve(FindAllActivitiesPendingUseCase, opts)
}

export const makeUpdateActivityByIdComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(UpdateActivityByIdUseCase)
}

export const makeUpdateActivityStatusComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(UpdateActivityStatusByIdUseCase)
}
