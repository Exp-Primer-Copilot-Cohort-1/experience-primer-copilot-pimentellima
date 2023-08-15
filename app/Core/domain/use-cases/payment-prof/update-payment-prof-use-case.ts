import LogDecorator from 'App/Core/decorators/log-decorator'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IPaymentProf } from 'Types/IPaymentProf'
import { PaymentProfManagerInterface } from '../../repositories/interface/payment-prof-manager-interface'

type TypeParams = {
	id: string
	paymentProf: IPaymentProf
	prof_id: string
}

export class UpdatePaymentProfUseCase implements UseCase<TypeParams, IPaymentProf> {
	constructor(private readonly paymentProfManager: PaymentProfManagerInterface) { }

	@LogDecorator('payment_participations', 'put')
	public async execute(params: TypeParams): PromiseEither<AbstractError, IPaymentProf> {
		const paymentProfOrErr = await this.paymentProfManager.updatePaymentProfById(
			params.paymentProf,
			params.id,
			params.prof_id,
		)

		if (paymentProfOrErr.isLeft()) return left(paymentProfOrErr.extract())
		return right(paymentProfOrErr.extract())
	}
}
