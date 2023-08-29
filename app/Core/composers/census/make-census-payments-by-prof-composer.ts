import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { CensusPaymentsMongooseRepository } from 'App/Core/domain/repositories'
import { FindPaymentsByProfUseCase } from 'App/Core/domain/use-cases'

export const makeCensusPaymentsByProfComposer = (): ControllerGeneric => {
	return new Controller(
		new FindPaymentsByProfUseCase(new CensusPaymentsMongooseRepository()),
	)
}
