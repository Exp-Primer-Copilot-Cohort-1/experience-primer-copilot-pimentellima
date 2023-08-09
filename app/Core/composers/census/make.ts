import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import {
	CensusClientsMongooseRepository,
	CensusCostMongooseRepository,
	CensusDaysMongooseRepository,
	CensusMongooseRepository,
	CensusPaymentParticipationsMongooseRepository,
	CensusPaymentsMongooseRepository,
	CensusRevenuesMongooseRepository,
} from 'App/Core/domain/repositories'
import {
	FindPaymentsByHealthInsuranceUseCase,
	PaymentsCensusByDateUseCase,
	PopulationCensusByDateUseCase,
} from 'App/Core/domain/use-cases'

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
			new CensusDaysMongooseRepository(),
			new CensusRevenuesMongooseRepository(),
			new CensusPaymentParticipationsMongooseRepository(),
			new CensusCostMongooseRepository(),
		),
	)
}
export const makeCensusPaymentsByHelthInsuranceComposer = (): ControllerGeneric => {
	return new Controller(
		new FindPaymentsByHealthInsuranceUseCase(new CensusPaymentsMongooseRepository()),
	)
}
