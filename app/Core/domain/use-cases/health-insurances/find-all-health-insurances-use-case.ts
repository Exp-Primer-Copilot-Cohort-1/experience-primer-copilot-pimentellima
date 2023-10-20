/* eslint-disable no-unused-vars */
import { HealthInsuranceMongoRepository } from 'App/Core/domain/repositories'
import { HealthInsuranceManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither } from 'App/Core/shared'
import { IHealthInsurance } from 'App/Types/IHealthInsurance'
import { inject, injectable, registry } from 'tsyringe'

type In = never

@injectable()
@registry([{ token: FindAllHealthInsuranceUseCaseV2, useClass: FindAllHealthInsuranceUseCaseV2 }])
export class FindAllHealthInsuranceUseCaseV2 implements UseCase<In, IHealthInsurance[]> {
	constructor(
		@inject(HealthInsuranceMongoRepository) private readonly manager: HealthInsuranceManagerInterface,
	) { }

	public async execute(): PromiseEither<AbstractError, IHealthInsurance[]> {

		return this.manager.findAll()
	}
}
