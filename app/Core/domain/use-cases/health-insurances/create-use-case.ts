import { ParamsNotPassedError } from 'App/Core/domain/errors/params-not-passed'
import { HealthInsuranceManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IHealthInsurance } from 'Types/IHealthInsurance'
import { Entity } from '../../entities/abstract/entity.abstract'

export class CreateHealthInsuranceUseCase
	implements UseCase<IHealthInsurance, IHealthInsurance>
{
	constructor(private readonly manager: HealthInsuranceManagerInterface) { }

	public async execute(
		params: IHealthInsurance,
	): PromiseEither<AbstractError, IHealthInsurance> {
		if (!params) {
			return left(new ParamsNotPassedError())
		}

		const healthOrErr = await this.manager.create(params as unknown as Entity)

		if (healthOrErr.isLeft()) {
			return left(healthOrErr.extract())
		}

		return right({
			...healthOrErr.extract(),
		} as IHealthInsurance)
	}
}
