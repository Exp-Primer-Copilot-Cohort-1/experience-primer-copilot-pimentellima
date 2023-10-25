import { HealthInsuranceManagerContract } from 'App/Core/domain/repositories/interface'
import { OptsQueryDefault } from 'App/Core/domain/use-cases/helpers/opts-query'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither } from 'App/Core/shared'

export class FindAllHealthInsuranceByUnityUseCase
	implements UseCase<OptsQueryDefault, any[]>
{
	constructor(private readonly manager: HealthInsuranceManagerContract) { }

	public async execute({
		unity_id,
	}: OptsQueryDefault): PromiseEither<AbstractError, any[]> {
		const healthOrErr = await this.manager.findAllByUnityId(unity_id)

		return healthOrErr
	}
}
