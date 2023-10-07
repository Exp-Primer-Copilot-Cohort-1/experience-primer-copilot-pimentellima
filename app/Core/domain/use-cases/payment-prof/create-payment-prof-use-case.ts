import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither } from 'App/Core/shared'
import type { IPaymentProf } from 'App/Types/IPaymentProf'
import { inject, injectable } from 'tsyringe'
import { PartnerMongooseRepository } from '../../repositories'
import { PaymentProfManagerInterface } from '../../repositories/interface/payment-prof-manager-interface'

@injectable()
export class CreatePaymentProfUseCase implements UseCase<IPaymentProf, IPaymentProf> {
	constructor(
		@inject(PartnerMongooseRepository) private readonly manager: PaymentProfManagerInterface
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
