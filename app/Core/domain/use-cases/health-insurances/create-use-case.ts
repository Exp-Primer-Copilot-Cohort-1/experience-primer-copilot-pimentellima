import { InvalidParamsError } from 'App/Core/domain/errors/invalid-params-error'
import { HealthInsuranceManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IHealthInsurance } from 'Types/IHealthInsurance'
import { HealthInsuranceEntity } from '../../entities/health-insurances/health-insurance'

export class CreateHealthInsuranceUseCase
	implements UseCase<IHealthInsurance, IHealthInsurance>
{
	constructor(private readonly manager: HealthInsuranceManagerInterface) { }

	public async execute(
		params: IHealthInsurance,
	): PromiseEither<AbstractError, IHealthInsurance> {
		if (!params) {
			return left(new InvalidParamsError())
		}

		const entityOrErr = await HealthInsuranceEntity.build(params)

		if (entityOrErr.isLeft()) return entityOrErr

		const entity = entityOrErr.extract()

		const healthOrErr = await this.manager.create(entity)

		if (healthOrErr.isLeft()) return healthOrErr as any

		const health = healthOrErr.extract().params() as unknown as IHealthInsurance

		return right(health)
	}
}
