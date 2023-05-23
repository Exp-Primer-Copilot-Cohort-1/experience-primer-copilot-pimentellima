import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import { PaymentProfEntity } from "../../entities/payment-prof/paymentProf";
import { PaymentProfManagerInterface } from "../../repositories/interface/payment-prof-manager-interface";
import { IPaymentProf } from "Types/IPaymentProf";

type TypeParams = {
	id: string;
	paymentProf: IPaymentProf;
};

export class UpdatePaymentProfUseCase
	implements UseCase<TypeParams, PaymentProfEntity>
{
	constructor(
		private readonly paymentProfManager: PaymentProfManagerInterface
	) {}

	public async execute(
		params: TypeParams
	): PromiseEither<AbstractError, PaymentProfEntity> {
		const paymentProfOrErr =
			await this.paymentProfManager.updatePaymentProfById(
				params.paymentProf,
				params.id
			);

		if (paymentProfOrErr.isLeft()) return left(paymentProfOrErr.extract());
		return right(paymentProfOrErr.extract());
	}
}
