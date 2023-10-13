import { MissingParamsError } from 'App/Core/domain/errors/missing-params'
import { ProceduresManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'

type Input = {
	id: string
}

export class DeleteProceduresByIdUseCase implements UseCase<Input, any> {
	constructor(private readonly procedureManager: ProceduresManagerInterface) { }

	public async execute({ id }): PromiseEither<AbstractError, any> {
		if (!id) {
			return left(new MissingParamsError('id'))
		}

		const procedureOrErr = await this.procedureManager.delete(id)

		return procedureOrErr
	}
}
