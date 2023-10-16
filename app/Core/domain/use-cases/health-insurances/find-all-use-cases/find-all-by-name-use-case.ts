import { HealthInsuranceManagerInterface } from 'App/Core/domain/repositories/interface/health-insurance-manager.interface'
import { OptsQueryDefault } from 'App/Core/domain/use-cases/helpers/opts-query'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither } from 'App/Core/shared'

export class FindAllHealthInsuranceByNameUseCase
	implements UseCase<OptsQueryDefault, any[]>
{
	constructor(private readonly manager: HealthInsuranceManagerInterface) { }

	public async execute({
		name,
		unity_id,
	}: Record<keyof OptsQueryDefault, string>): PromiseEither<AbstractError, any[]> {
		const healthsOrErr = await this.manager.findAllByName(name, unity_id)

		return healthsOrErr
	}
}
