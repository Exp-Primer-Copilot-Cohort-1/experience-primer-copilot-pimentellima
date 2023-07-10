import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { BillingMongooseRepository } from 'App/Core/domain/repositories'
import {
	FindAllByYearRevenueReportsUseCase,
	UpdateAttrBillingInMonthUseCase,
} from 'App/Core/domain/use-cases'

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
