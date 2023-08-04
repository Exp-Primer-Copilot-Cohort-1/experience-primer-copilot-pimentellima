import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { PaymentProfMongoRepository } from 'App/Core/domain/repositories/payment-participations/payment-prof-mongo-repository'
import { CreatePaymentProfUseCase } from 'App/Core/domain/use-cases/payment-prof/create-payment-prof-use-case'

export const makeCreatePaymentProfComposer = (): ControllerGeneric => {
	return new Controller(new CreatePaymentProfUseCase(new PaymentProfMongoRepository()))
}
