import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither } from 'App/Core/shared'

import { IProcedure } from 'Types/IProcedure'
import { ProceduresManagerInterface } from '../../../repositories/interface'

export class CreateProceduresUseCase implements UseCase<Partial<IProcedure>, IProcedure> {
	constructor(private readonly proceduresManager: ProceduresManagerInterface) { }

	public async execute(
		params: Partial<IProcedure>,
	): PromiseEither<AbstractError, IProcedure> {
		const procedureOrErr = await this.proceduresManager.createProcedure(params)

		return procedureOrErr
	}
}
