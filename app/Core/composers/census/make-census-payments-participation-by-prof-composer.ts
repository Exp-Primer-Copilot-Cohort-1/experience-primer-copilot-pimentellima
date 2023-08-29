import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { CensusPaymentParticipationsMongooseRepository } from 'App/Core/domain/repositories'
import { FindPaymentsParticipationByProfUseCase } from 'App/Core/domain/use-cases'

export const makeCensusPaymentsParticipationByProfComposer = (): ControllerGeneric => {
	return new Controller(
		new FindPaymentsParticipationByProfUseCase(
			new CensusPaymentParticipationsMongooseRepository(),
		),
	)
}
