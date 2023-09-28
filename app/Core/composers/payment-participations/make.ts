import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { OptsQuery } from 'App/Core/domain/entities/helpers/opts-query'
import { PaymentProfMongoRepository } from 'App/Core/domain/repositories/payment-participations/payment-prof-mongo-repository'
import { CreatePaymentProfUseCase } from 'App/Core/domain/use-cases/payment-prof/create-payment-prof-use-case'
import { FindAllPaymentProfsUseCase } from 'App/Core/domain/use-cases/payment-prof/find-all-payment-profs-use-case'

export const makeFindAllPaymentParticipationsComposer = (opts: OptsQuery): ControllerGeneric => {
	return new Controller(
		new FindAllPaymentProfsUseCase(new PaymentProfMongoRepository(undefined, opts)),
	)
}

export const makeCreatePaymentParticipationsComposer = (): ControllerGeneric => {
	return new Controller(new CreatePaymentProfUseCase(new PaymentProfMongoRepository()))
}

export const makeUpdatePaymentParticipationsComposer = (): ControllerGeneric => {
	return new Controller(new CreatePaymentProfUseCase(new PaymentProfMongoRepository()))
}
