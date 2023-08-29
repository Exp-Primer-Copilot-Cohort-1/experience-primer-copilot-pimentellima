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
	HolidaysMongoRepository,
	HolidaysNationalsMongoRepository,
	ProfsMongooseRepository,
} from 'App/Core/domain/repositories'
import {
	DayTradesIntervalDatesByProfUseCase,
	FindAllHolidaysByUnityUseCase,
	FindIdlenessByProfUseCase,
	FindPaymentsByHealthInsuranceUseCase,
	PaymentsCensusByDateUseCase,
	PopulationCensusByDateUseCase,
	SaveHolidaysNationalsDefaultUseCase,
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
export const makeCensusPaymentsByHealthInsuranceComposer = (): ControllerGeneric => {
	return new Controller(
		new FindPaymentsByHealthInsuranceUseCase(new CensusPaymentsMongooseRepository()),
	)
}

export const makeCensusIdlenessByProfComposer = (): ControllerGeneric => {
	return new Controller(
		new FindIdlenessByProfUseCase(
			new CensusDaysMongooseRepository(),
			new DayTradesIntervalDatesByProfUseCase(
				new ProfsMongooseRepository(),
				new FindAllHolidaysByUnityUseCase(
					new HolidaysMongoRepository(),
					new SaveHolidaysNationalsDefaultUseCase(
						new HolidaysNationalsMongoRepository(),
					),
				),
			),
		),
	)
}
