import { ProcedureEntity } from 'App/Core/domain/entities'
import { IdNotProvidedError } from 'App/Core/domain/errors/id-not-provided'
import { ProceduresMongooseRepository } from 'App/Core/domain/repositories'
import { ProceduresManagerContract } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { IProcedure } from 'App/Types/IProcedure'
import { inject, injectable, registry } from 'tsyringe'

@injectable()
@registry([{ token: UpdateProceduresByIdUseCase, useClass: UpdateProceduresByIdUseCase }])
export class UpdateProceduresByIdUseCase
	implements UseCase<Partial<IProcedure>, IProcedure>
{
	constructor(
		@inject(ProceduresMongooseRepository)
		private readonly manager: ProceduresManagerContract,
	) {}

	public async execute({
		_id,
		profs,
		...procedure
	}: IProcedure): PromiseEither<AbstractError, IProcedure> {
		console.log(procedure)
		try {
			if (!_id) return left(new IdNotProvidedError())

			return await this.manager.update(_id, procedure)
		} catch (err) {
			return left(new AbstractError('Erro interno', 500))
		}
	}
}
