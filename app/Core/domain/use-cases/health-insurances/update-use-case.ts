import { ParamsNotPassedError } from 'App/Core/domain/errors/params-not-passed'
import { HealthInsuranceManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IHealthInsurance } from 'Types/IHealthInsurance'

export class UpdateHealthInsuranceUseCase
	implements UseCase<IHealthInsurance, IHealthInsurance>
{
	constructor(private readonly manager: HealthInsuranceManagerInterface) { }

	public async execute(
		params: IHealthInsurance,
	): PromiseEither<AbstractError, IHealthInsurance> {
		if (!params) {
			return left(new ParamsNotPassedError())
		}

		const healthOrErr = await this.manager.update(params._id, params as any)

		if (healthOrErr.isLeft()) {
			return left(healthOrErr.extract())
		}

		return right({
			...healthOrErr.extract(),
		} as IHealthInsurance)
	}
}
