import { MissingParamsError } from 'App/Core/domain/errors/missing-params'
import { ProceduresManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { IProcedure } from 'App/Types/IProcedure'
import { inject, injectable, registry } from 'tsyringe'
import { ProceduresMongooseRepository } from '../../repositories'

@injectable()
@registry([{ token: UpdateProceduresByIdUseCase, useClass: UpdateProceduresByIdUseCase }])
export class UpdateProceduresByIdUseCase
	implements UseCase<Partial<IProcedure>, IProcedure>
{
	constructor(@inject(ProceduresMongooseRepository) private readonly manager: ProceduresManagerInterface) { }

	public async execute(
		procedure: Partial<IProcedure>,
	): PromiseEither<AbstractError, IProcedure> {
		if (!procedure?._id) {
			return left(new MissingParamsError('_id is required'))
		}
		const proceduresOrErr = await this.manager.updateProceduresById(
			procedure._id,
			procedure,
		)

		if (proceduresOrErr.isLeft()) {
			return left(proceduresOrErr.extract())
		}

		return proceduresOrErr
	}
}
