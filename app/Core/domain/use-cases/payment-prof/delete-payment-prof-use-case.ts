import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import { PaymentProfEntity } from "../../entities/payment-prof/paymentProf";
import { PaymentProfManagerInterface } from "../../repositories/interface/payment-prof-manager-interface";

type TypeParams = {
    id: string
}

export class DeletePaymentProfByIdUseCase
	implements UseCase<TypeParams, PaymentProfEntity>
{
	constructor(
		private readonly paymentProfManager: PaymentProfManagerInterface
	) {}

	public async execute(
		params: TypeParams
	): PromiseEither<AbstractError, PaymentProfEntity> {
		const paymentProfOrErr =
			await this.paymentProfManager.deletePaymentProfById(params.id);

		if (paymentProfOrErr.isLeft())
			return left(paymentProfOrErr.extract());
		return right(paymentProfOrErr.extract());
	}
}
