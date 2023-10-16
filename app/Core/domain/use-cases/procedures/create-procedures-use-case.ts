import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither } from 'App/Core/shared'

import { ProceduresMongooseRepository } from 'App/Core/domain/repositories'
import { ProceduresManagerInterface } from 'App/Core/domain/repositories/interface'
import { IProcedure } from 'App/Types/IProcedure'
import { inject, injectable, registry } from 'tsyringe'

@injectable()
@registry([{ token: CreateProceduresUseCase, useClass: CreateProceduresUseCase }])
export class CreateProceduresUseCase implements UseCase<Partial<IProcedure>, IProcedure> {
	constructor(
		@inject(ProceduresMongooseRepository) private readonly manager: ProceduresManagerInterface
	) { } // eslint-disable-line

	public async execute(
		params: Partial<IProcedure>,
	): PromiseEither<AbstractError, IProcedure> {

		return await this.manager.create(params)
	}
}
