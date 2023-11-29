import { IdNotProvidedError } from 'App/Core/domain/errors/id-not-provided'
import { ProceduresMongooseRepository } from 'App/Core/domain/repositories'
import { ProceduresManagerContract } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { IProcedure } from 'App/Types/IProcedure'
import { inject, injectable, registry } from 'tsyringe'
import { ProcedureEntity } from '../../entities'

@injectable()
@registry([{ token: UpdateProceduresByIdUseCase, useClass: UpdateProceduresByIdUseCase }])
export class UpdateProceduresByIdUseCase
	implements UseCase<Partial<IProcedure>, IProcedure>
{
	constructor(
		@inject(ProceduresMongooseRepository)
		private readonly manager: ProceduresManagerContract,
	) { }

	public async execute({
		_id,
		...procedure
	}: IProcedure): PromiseEither<AbstractError, IProcedure> {
		if (!_id) return left(new IdNotProvidedError())

		const entityOrErr = await ProcedureEntity.build(procedure)

		if (entityOrErr.isLeft()) return entityOrErr

		const entity = entityOrErr.extract()

		return await this.manager.update(
			_id,
			entity,
		)
	}
}
