import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IPaymentProf } from 'App/Types/IPaymentProf'
import { PaymentProfManagerInterface } from '../../repositories/interface/payment-prof-manager-interface'

type TypeParams = {
	unity_id: string
}

export class FindAllPaymentProfsUseCase implements UseCase<TypeParams, IPaymentProf[]> {
	constructor(private readonly paymentProfManager: PaymentProfManagerInterface) { }

	public async execute(
		params: TypeParams,
	): PromiseEither<AbstractError, IPaymentProf[]> {
		const paymentProfsOrErr = await this.paymentProfManager.findAllPaymentProfs(
			params.unity_id,
		)

		if (paymentProfsOrErr.isLeft()) return left(paymentProfsOrErr.extract())
		return right(paymentProfsOrErr.extract())
	}
}
