import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither } from 'App/Core/shared'

import { ProcedureEntity } from 'App/Core/domain/entities'
import { ProceduresMongooseRepository } from 'App/Core/domain/repositories'
import { ProceduresManagerInterface } from 'App/Core/domain/repositories/interface'
import { IProcedure } from 'App/Types/IProcedure'
import { inject, injectable, registry } from 'tsyringe'
@injectable()
@registry([{ token: CreateProceduresUseCase, useClass: CreateProceduresUseCase }])
export class CreateProceduresUseCase implements UseCase<IProcedure, IProcedure> {
	constructor(
		@inject(ProceduresMongooseRepository) private readonly manager: ProceduresManagerInterface
	) { } // eslint-disable-line

	public async execute(
		params: IProcedure,
	): PromiseEither<AbstractError, IProcedure> {
		const entityOrError = await ProcedureEntity.build(params)

		if (entityOrError.isLeft()) return entityOrError

		const entity = entityOrError.extract()

		return await this.manager.create(entity)
	}
}
