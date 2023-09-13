import LogDecorator from 'App/Core/decorators/log-decorator'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import type { IPaymentProf } from 'App/Types/IPaymentProf'
import { PaymentProfManagerInterface } from '../../repositories/interface/payment-prof-manager-interface'

export class CreatePaymentProfUseCase implements UseCase<IPaymentProf, IPaymentProf> {
	constructor(private readonly paymentProfManager: PaymentProfManagerInterface) { }

	@LogDecorator('payment_participations', 'post')
	public async execute(
		paymentProf: IPaymentProf,
	): PromiseEither<AbstractError, IPaymentProf> {
		const paymentProfOrErr = await this.paymentProfManager.createOrUpdatePaymentProf(
			paymentProf,
		)

		if (paymentProfOrErr.isLeft()) return left(paymentProfOrErr.extract())

		return right(paymentProfOrErr.extract())
	}
}
