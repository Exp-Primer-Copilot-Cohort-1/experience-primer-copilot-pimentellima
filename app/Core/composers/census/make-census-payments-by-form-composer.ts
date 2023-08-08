import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { CensusPaymentsMongooseRepository } from 'App/Core/domain/repositories'
import { FindPaymentsByFormUseCase } from 'App/Core/domain/use-cases'

export const makeCensusPaymentsByFormComposer = (): ControllerGeneric => {
	return new Controller(
		new FindPaymentsByFormUseCase(new CensusPaymentsMongooseRepository()),
	)
}
