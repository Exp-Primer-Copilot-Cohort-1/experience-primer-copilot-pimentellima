import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { CensusPaymentsMongooseRepository } from 'App/Core/domain/repositories'
import { FindPaymentsByPartnersUseCase } from 'App/Core/domain/use-cases'

export const makeCensusPaymentsByPartnerComposer = (): ControllerGeneric => {
	return new Controller(
		new FindPaymentsByPartnersUseCase(
			new CensusPaymentsMongooseRepository()
		)
	)
}
