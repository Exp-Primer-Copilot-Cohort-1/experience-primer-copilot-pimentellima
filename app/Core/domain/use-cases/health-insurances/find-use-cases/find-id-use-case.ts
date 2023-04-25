import { ParamsNotPassedError } from 'App/Core/domain/errors/params-not-passed'
import { HealthInsuranceManagerInterface } from 'App/Core/domain/repositories/interface'
import { OptsQueryDefault } from 'App/Core/domain/use-cases/helpers/opts-query'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'

type OptFindID = Required<Pick<OptsQueryDefault, 'id'>>

export class FindHealthInsuranceByIdUseCase implements UseCase<OptFindID, any[]> {
	constructor(private readonly manager: HealthInsuranceManagerInterface) { }

	public async execute(params: OptFindID): PromiseEither<AbstractError, any[]> {
		if (!params) {
			return left(new ParamsNotPassedError())
		}

		const healthOrErr = await this.manager.findById(params.id)

		return healthOrErr
	}
}
