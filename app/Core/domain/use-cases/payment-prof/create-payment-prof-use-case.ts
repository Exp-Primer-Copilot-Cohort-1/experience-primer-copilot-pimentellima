import { PartnerMongooseRepository } from 'App/Core/domain/repositories'
import { PaymentProfManagerContract } from 'App/Core/domain/repositories/interface/payment-prof-manager-interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither } from 'App/Core/shared'
import type { IPaymentProf } from 'App/Types/IPaymentProf'
import { inject, injectable } from 'tsyringe'

@injectable()
export class CreatePaymentProfUseCase implements UseCase<IPaymentProf, IPaymentProf> {
	constructor(
		@inject(PartnerMongooseRepository) private readonly manager: PaymentProfManagerContract
	) {
	} // eslint-disable-line

	public async execute(
		paymentProf: IPaymentProf,
	): PromiseEither<AbstractError, IPaymentProf> {

		return await this.manager.createOrUpdatePaymentProf(
			paymentProf,
		)
	}
}
