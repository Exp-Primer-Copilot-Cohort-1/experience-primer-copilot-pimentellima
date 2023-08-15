import LogDecorator from 'App/Core/decorators/log-decorator'
import { MissingParamsError } from 'App/Core/domain/errors/missing-params'
import { ProceduresManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { IProcedure } from 'Types/IProcedure'

export class UpdateProceduresByIdUseCase
	implements UseCase<Partial<IProcedure>, IProcedure>
{
	constructor(private readonly procedureManager: ProceduresManagerInterface) { }

	@LogDecorator('procedures', 'put')
	public async execute(
		procedure: Partial<IProcedure>,
	): PromiseEither<AbstractError, IProcedure> {
		if (!procedure?._id) {
			return left(new MissingParamsError('_id is required'))
		}
		const proceduresOrErr = await this.procedureManager.updateProceduresById(
			procedure._id,
			procedure,
		)

		if (proceduresOrErr.isLeft()) {
			return left(proceduresOrErr.extract())
		}

		return proceduresOrErr
	}
}
