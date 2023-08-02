import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IPaymentProf } from 'Types/IPaymentProf'
import { PaymentProfEntity } from '../../entities/payment-prof/paymentProf'
import { PaymentProfManagerInterface } from '../../repositories/interface/payment-prof-manager-interface'

export class CreatePaymentProfUseCase
	implements UseCase<IPaymentProf, PaymentProfEntity>
{
	constructor(private readonly paymentProfManager: PaymentProfManagerInterface) { }

	public async execute(
		paymentProf: IPaymentProf,
	): PromiseEither<AbstractError, PaymentProfEntity> {
		const paymentProfOrErr = await this.paymentProfManager.createPaymentProf(
			paymentProf,
		)

		if (paymentProfOrErr.isLeft()) return left(paymentProfOrErr.extract())
		return right(paymentProfOrErr.extract())
	}
}
