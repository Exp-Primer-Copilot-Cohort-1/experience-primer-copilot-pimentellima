import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { OptsQuery } from 'App/Core/domain/entities/helpers/opts-query'
import { PaymentProfMongoRepository } from 'App/Core/domain/repositories'
import { FindAllPaymentProfsUseCase } from 'App/Core/domain/use-cases/payment-prof/find-all-payment-profs-use-case'

export const makeFindAllPaymentProfsComposer = (opts: OptsQuery): ControllerGeneric => {
	return new Controller(
		new FindAllPaymentProfsUseCase(new PaymentProfMongoRepository(undefined, opts)),
	)
}
