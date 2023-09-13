import { UnitNotFoundError } from 'App/Core/domain/errors'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { IProcedure } from 'App/Types/IProcedure'
import { ProceduresManagerInterface } from '../../../repositories/interface'

type FindAllProps = {
	name?: string
	unity_id: string
}

export class FindAllProceduresByUnityUseCase
	implements UseCase<FindAllProps, IProcedure[]>
{
	// eslint-disable-next-line @typescript-eslint/no-empty-function, prettier/prettier
	constructor(private readonly proceduresManager: ProceduresManagerInterface) { }

	public async execute(
		input: FindAllProps,
	): PromiseEither<AbstractError, IProcedure[]> {
		if (!input?.unity_id) {
			return left(new UnitNotFoundError())
		}

		const proceduresOrErr = await this.proceduresManager.findByUnityId(input.unity_id)

		return proceduresOrErr
	}
}
