import { UnitiesMongooseRepository } from 'App/Core/domain/repositories'
import { UnitiesManagerContract } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither } from 'App/Core/shared'
import { IUnity } from 'App/Types/IUnity'
import { inject, injectable, registry } from 'tsyringe'

type In = never

@injectable()
@registry([{ token: FindAllUnitiesUseCase, useClass: FindAllUnitiesUseCase }])
export class FindAllUnitiesUseCase implements UseCase<In, IUnity[]> {

	constructor(
		@inject(UnitiesMongooseRepository) private readonly manager: UnitiesManagerContract
	) { }

	public async execute(): PromiseEither<AbstractError, IUnity[]> {
		return await this.manager.findAll()
	}
}
