import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IPaymentProf } from 'App/Types/IPaymentProf'
import { PaymentProfManagerInterface } from '../../repositories/interface/payment-prof-manager-interface'

type TypeParams = {
	id: string
	paymentProf: IPaymentProf
	prof_id: string
}

export class UpdatePaymentProfUseCase implements UseCase<TypeParams, IPaymentProf> {
	constructor(private readonly paymentProfManager: PaymentProfManagerInterface) { } // eslint-disable-line

	public async execute(params: TypeParams): PromiseEither<AbstractError, IPaymentProf> {
		const paymentProfOrErr = await this.paymentProfManager.createOrUpdatePaymentProf(
			params.paymentProf,
		)

		if (paymentProfOrErr.isLeft()) return left(paymentProfOrErr.extract())
		return right(paymentProfOrErr.extract())
	}
}
