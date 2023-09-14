import LogDecorator from 'App/Core/decorators/log-decorator'
import { InvalidParamsError } from 'App/Core/domain/errors/invalid-params-error'
import { HealthInsuranceManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IHealthInsurance } from 'App/Types/IHealthInsurance'

export class UpdateHealthInsuranceUseCase
	implements UseCase<Partial<IHealthInsurance>, IHealthInsurance>
{
	constructor(private readonly manager: HealthInsuranceManagerInterface) { }

	@LogDecorator('health_insurances', 'put')
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

		return right(healthOrErr.extract())
	}
}
