import { Controller, ControllerInjection } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import getterOptInRequest from 'App/Core/domain/entities/helpers/getter-opt-in-request'
import { OptsQuery } from 'App/Core/domain/entities/helpers/opts-query'
import {
	CensusClientsMongooseRepository,
	CensusCostMongooseRepository,
	CensusDaysMongooseRepository,
	CensusMongooseRepository,
	CensusPaymentParticipationsMongooseRepository,
	CensusPaymentsMongooseRepository,
	CensusRevenuesMongooseRepository
} from 'App/Core/domain/repositories'
import {
	FindIdlenessByProfUseCase,
	FindPaymentsByHealthInsuranceUseCase,
	PaymentsCensusByDateUseCase,
	PopulationCensusByDateUseCase
} from 'App/Core/domain/use-cases'
import { HttpContextContract } from 'App/Types/Adonis'

export const makeCensusByMonthByUnityIdComposer = (): ControllerGeneric => {
	return new Controller(
		new PopulationCensusByDateUseCase(
			new CensusMongooseRepository(),
			new CensusClientsMongooseRepository(),
		),
	)
}

export const makeCensusPaymentsByMonthByUnityIdComposer = (): ControllerGeneric => {
	return new Controller(
		new PaymentsCensusByDateUseCase(
			new CensusPaymentsMongooseRepository(),
			new CensusMongooseRepository(),
			new CensusDaysMongooseRepository(OptsQuery.build()),
			new CensusRevenuesMongooseRepository(),
			new CensusPaymentParticipationsMongooseRepository(),
			new CensusCostMongooseRepository(),
		),
	)
}
export const makeCensusPaymentsByHealthInsuranceComposer = (): ControllerGeneric => {
	return new Controller(
		new FindPaymentsByHealthInsuranceUseCase(new CensusPaymentsMongooseRepository()),
	)
}

export const makeCensusIdlenessByProfComposer = (ctx: HttpContextContract): ControllerGeneric => {
	const opts = getterOptInRequest(ctx)
	return ControllerInjection.resolve(FindIdlenessByProfUseCase, opts)
}
