import { PaymentProfMongoRepository } from 'App/Core/domain/repositories'
import { PaymentProfManagerContract } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither } from 'App/Core/shared'
import { ParticipationPrice } from 'App/Types/IPaymentProf'
import { inject, injectable, registry } from 'tsyringe'

type In = { unity_id: string, prof_id: string, health_insurance_id: string, procedure_id: string }

@injectable()
@registry([{ token: FindCurrentPaymentParticipationUseCase, useClass: FindCurrentPaymentParticipationUseCase }])
export class FindCurrentPaymentParticipationUseCase implements UseCase<In, ParticipationPrice> {
	constructor(
		@inject(PaymentProfMongoRepository) private readonly manager: PaymentProfManagerContract) {
	}

	public async execute(
		{
			health_insurance_id,
			procedure_id,
			prof_id,
			unity_id,
		}: In,
	): PromiseEither<AbstractError, ParticipationPrice> {

		return await this.manager.findCurrentPaymentParticipation(
			unity_id,
			prof_id,
			health_insurance_id,
			procedure_id,
		)
	}
}
