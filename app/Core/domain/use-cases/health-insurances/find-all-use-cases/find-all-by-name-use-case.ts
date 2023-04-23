import { OptsQueryDefault } from 'App/Core/domain/use-cases/helpers/opts-query'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither } from 'App/Core/shared'
import { HealthInsuranceManagerInterface } from '../../../repositories/interface/health-insurance-manager.interface'

export class FindAllHealthInsuranceByNameUseCase
	implements UseCase<OptsQueryDefault, any[]>
{
	constructor(private readonly manager: HealthInsuranceManagerInterface) { }

	public async execute({
		name,
		unity_id,
	}: OptsQueryDefault): PromiseEither<AbstractError, any[]> {
		const healthsOrErr = await this.manager.findAllByName(name, unity_id)

		return healthsOrErr
	}
}
