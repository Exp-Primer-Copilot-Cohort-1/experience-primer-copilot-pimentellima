import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { BillingMongooseRepository } from 'App/Core/domain/repositories'
import {
	FindAllByYearRevenueReportsUseCase,
	MinimumDesirableUseCase,
	UpdateAttrBillingInMonthUseCase,
} from 'App/Core/domain/use-cases'
import { AveragePriceProceduresUseCase } from 'App/Core/domain/use-cases/procedures/average-price-procedures-group-by-prof'
import { dayTradeSut } from './day-trade-sut'

export const makeFindBiliingYearByUnityIdComposer = (): ControllerGeneric => {
	return new Controller(
		new FindAllByYearRevenueReportsUseCase(new BillingMongooseRepository()),
	)
}

export const makeUpdateBillingDesirableByUnityComposer = (): ControllerGeneric => {
	return new Controller(
		new UpdateAttrBillingInMonthUseCase(new BillingMongooseRepository(), 'desirable'),
	)
}

export const makeMinimunBillingByUnityComposer = () => {
	const updateExpected = new UpdateAttrBillingInMonthUseCase(
		new BillingMongooseRepository(),
		'expected',
	)
	const average = new AveragePriceProceduresUseCase()
	const { dayTrade } = dayTradeSut()
	return new Controller(new MinimumDesirableUseCase(average, dayTrade, updateExpected))
}
