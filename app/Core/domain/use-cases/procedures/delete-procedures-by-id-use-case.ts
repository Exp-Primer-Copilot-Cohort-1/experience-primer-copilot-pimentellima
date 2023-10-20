import { ProceduresManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { IdNotProvidedError } from '../../errors/id-not-provided'

type In = {
	id: string
}

export class DeleteProceduresByIdUseCase implements UseCase<In, any> {
	constructor(private readonly manager: ProceduresManagerInterface) { }

	public async execute({ id }: In): PromiseEither<AbstractError, any> {

		if (!id) return left(new IdNotProvidedError())

		return await this.manager.delete(id)
	}
}
