import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Controller, ControllerInjection } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { HealthInsuranceMongoRepository } from 'App/Core/domain/repositories'

import getterOptInRequest from 'App/Core/domain/entities/helpers/getter-opt-in-request'
import {
	CreateHealthInsuranceUseCase,
	FindAllHealthInsuranceUseCaseV2,
	FindHealthInsuranceByIdUseCase,
	UpdateHealthInsuranceUseCase,
} from 'App/Core/domain/use-cases'

export const makeHealthInsuranceFindAllByUnityIdComposer = (
	ctx: HttpContextContract,
): ControllerGeneric => {
	const opts = getterOptInRequest(ctx)
	return ControllerInjection.resolve(FindAllHealthInsuranceUseCaseV2, opts)
}

export const makeHealthInsuranceFindByIdComposer = (): ControllerGeneric => {
	return new Controller(
		new FindHealthInsuranceByIdUseCase(new HealthInsuranceMongoRepository()),
	)
}

export const makeHealthInsuranceUpdateComposer = (): ControllerGeneric => {
	return new Controller(
		new UpdateHealthInsuranceUseCase(new HealthInsuranceMongoRepository()),
	)
}

export const makeHealthInsuranceCreateComposer = (): ControllerGeneric => {
	return new Controller(
		new CreateHealthInsuranceUseCase(new HealthInsuranceMongoRepository()),
	)
}
