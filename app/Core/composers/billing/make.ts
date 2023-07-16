import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { BillingMongooseRepository } from 'App/Core/domain/repositories'
import {
	FindAllByYearRevenueReportsUseCase,
	MinimumDesirableUseCase,
	UpdateAttrBillingInMonthUseCase,
	UpdateDesirableBillingInMonthUseCase,
} from 'App/Core/domain/use-cases'
import { AveragePriceProceduresUseCase } from 'App/Core/domain/use-cases/procedures/average-price-procedures-group-by-prof'
import { UpdateCurrentBillingInMonthUseCase } from 'App/Core/domain/use-cases/reports/minimum-revenue/update-current-revenue-reports-in-month-use-case'
import { dayTradeSut } from './day-trade-sut'

export const makeFindBiliingYearByUnityIdComposer = (): ControllerGeneric => {
	return new Controller(
		new FindAllByYearRevenueReportsUseCase(new BillingMongooseRepository()),
	)
}

export const makeUpdateBillingDesirableByUnityComposer = (): ControllerGeneric => {
	return new Controller(
		new UpdateDesirableBillingInMonthUseCase(new BillingMongooseRepository()),
	)
}

export const makeMinimunBillingByUnityComposer = () => {
	const updateExpected = new UpdateAttrBillingInMonthUseCase(
		new BillingMongooseRepository(),
		'expected',
	)
	const average = new AveragePriceProceduresUseCase()

	const updateCurrent = new UpdateCurrentBillingInMonthUseCase(
		new BillingMongooseRepository(),
	)

	const { dayTrade } = dayTradeSut()
	return new Controller(
		new MinimumDesirableUseCase(average, dayTrade, updateExpected, updateCurrent),
	)
}
