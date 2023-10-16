import { ProceduresMongooseRepository } from 'App/Core/domain/repositories'
import { ProceduresManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { IProcedure } from 'App/Types/IProcedure'
import { inject, injectable, registry } from 'tsyringe'
import { IdNotProvidedError } from '../../errors/id-not-provided'

@injectable()
@registry([{ token: UpdateProceduresByIdUseCase, useClass: UpdateProceduresByIdUseCase }])
export class UpdateProceduresByIdUseCase
	implements UseCase<Partial<IProcedure>, IProcedure>
{
	constructor(
		@inject(ProceduresMongooseRepository) private readonly manager: ProceduresManagerInterface
	) { }

	public async execute(
		procedure: Partial<IProcedure>,
	): PromiseEither<AbstractError, IProcedure> {
		if (!procedure?._id) return left(new IdNotProvidedError())

		return await this.manager.update(
			procedure._id,
			procedure,
		)
	}
}
