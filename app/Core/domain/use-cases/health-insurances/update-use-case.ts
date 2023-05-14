import { InvalidParamsError } from 'App/Core/domain/errors/invalid-params-error'
import { HealthInsuranceManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IHealthInsurance } from 'Types/IHealthInsurance'

export class UpdateHealthInsuranceUseCase
	implements UseCase<Partial<IHealthInsurance>, IHealthInsurance>
{
	constructor(private readonly manager: HealthInsuranceManagerInterface) { }

	public async execute(
		params: Partial<IHealthInsurance>,
	): PromiseEither<AbstractError, IHealthInsurance> {
		if (!params?._id) {
			return left(new InvalidParamsError())
		}

		const healthOrErr = await this.manager.update(params._id, params)

		if (healthOrErr.isLeft()) {
			return left(healthOrErr.extract())
		}

		const health = healthOrErr.extract().params()

		return right(health)
	}
}
