import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { IPaymentProf } from 'App/Types/IPaymentProf'
import { inject, injectable } from 'tsyringe'
import { UnitNotFoundError } from '../../errors'
import { PaymentProfMongoRepository } from '../../repositories'
import { PaymentProfManagerInterface } from '../../repositories/interface/payment-prof-manager-interface'

type TypeParams = {
	unity_id: string
}

@injectable()
export class FindAllPaymentProfsUseCase implements UseCase<TypeParams, IPaymentProf[]> {
	constructor(
		@inject(PaymentProfMongoRepository) private readonly manager: PaymentProfManagerInterface) {
	}

	public async execute(
		{ unity_id }: TypeParams,
	): PromiseEither<AbstractError, IPaymentProf[]> {
		if (!unity_id) return left(new UnitNotFoundError())

		return await this.manager.findAllPaymentProfs(
			unity_id,
		)
	}
}
