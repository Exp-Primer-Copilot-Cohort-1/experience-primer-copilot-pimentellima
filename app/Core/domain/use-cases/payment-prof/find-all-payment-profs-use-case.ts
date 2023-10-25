import { UnityNotFoundError } from 'App/Core/domain/errors'
import { PaymentProfMongoRepository } from 'App/Core/domain/repositories'
import { PaymentProfManagerContract } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { IPaymentProf } from 'App/Types/IPaymentProf'
import { inject, injectable, registry } from 'tsyringe'

type TypeParams = {
	unity_id: string
}

@injectable()
@registry([{ token: FindAllPaymentProfsUseCase, useClass: FindAllPaymentProfsUseCase }])
export class FindAllPaymentProfsUseCase implements UseCase<TypeParams, IPaymentProf[]> {
	constructor(
		@inject(PaymentProfMongoRepository) private readonly manager: PaymentProfManagerContract) {
	}

	public async execute(
		{ unity_id }: TypeParams,
	): PromiseEither<AbstractError, IPaymentProf[]> {
		if (!unity_id) return left(new UnityNotFoundError())

		return await this.manager.findAllPaymentProfs(
			unity_id,
		)
	}
}
