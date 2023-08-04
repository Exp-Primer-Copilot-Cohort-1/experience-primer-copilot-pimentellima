import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { OptsQuery } from 'App/Core/domain/entities/helpers/opts-query'
import { PaymentProfMongoRepository } from 'App/Core/domain/repositories'
import { FindPaymentProfByIdUseCase } from 'App/Core/domain/use-cases/payment-prof/find-payment-prof-by-id-use-case'

export const makeFindPaymentProfByIdComposer = (opts: OptsQuery): ControllerGeneric => {
	return new Controller(
		new FindPaymentProfByIdUseCase(new PaymentProfMongoRepository(opts)),
	)
}
