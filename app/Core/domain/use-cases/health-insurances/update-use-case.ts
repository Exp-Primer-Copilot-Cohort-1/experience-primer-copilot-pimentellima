import { ParamsNotPassedError } from 'App/Core/domain/errors/params-not-passed'
import { HealthInsuranceManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { IHealthInsurance } from 'Types/IHealthInsurance'

export class UpdateHealthInsuranceUseCase implements UseCase<IHealthInsurance, any> {
	constructor(private readonly manager: HealthInsuranceManagerInterface) { }

	public async execute(params: IHealthInsurance): PromiseEither<AbstractError, any> {
		if (!params) {
			return left(new ParamsNotPassedError())
		}

		const healthOrErr = await this.manager.update(params._id, params as any)

		return healthOrErr
	}
}
