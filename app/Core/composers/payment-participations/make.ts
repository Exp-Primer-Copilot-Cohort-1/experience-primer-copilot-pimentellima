import { ControllerInjection } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { OptsQuery } from 'App/Core/domain/entities/helpers/opts-query'
import { CreatePaymentProfUseCase } from 'App/Core/domain/use-cases/payment-prof/create-payment-prof-use-case'
import { FindAllPaymentProfsUseCase } from 'App/Core/domain/use-cases/payment-prof/find-all-payment-profs-use-case'

export const makeFindAllPaymentParticipationsComposer = (opts: OptsQuery): ControllerGeneric => {
	return ControllerInjection.resolve(FindAllPaymentProfsUseCase, opts)
}

export const makeCreatePaymentParticipationsComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(CreatePaymentProfUseCase)
}

export const makeUpdatePaymentParticipationsComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(CreatePaymentProfUseCase)
}
