import { UnityIdNotProvidedError } from 'App/Core/domain/errors'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { IProcedure } from 'App/Types/IProcedure'
import { inject, injectable, registry } from 'tsyringe'
import { ProceduresMongooseRepository } from '../../repositories'
import { ProceduresManagerInterface } from '../../repositories/interface'

type In = {
	unity_id: string
}
@injectable()
@registry([{ token: FindAllProceduresByUnityUseCase, useClass: FindAllProceduresByUnityUseCase }])
export class FindAllProceduresByUnityUseCase
	implements UseCase<In, IProcedure[]>
{
	// eslint-disable-next-line @typescript-eslint/no-empty-function, prettier/prettier
	constructor(@inject(ProceduresMongooseRepository) private readonly manager: ProceduresManagerInterface) { }

	public async execute(
		{ unity_id }: In,
	): PromiseEither<AbstractError, IProcedure[]> {
		if (!unity_id) return left(new UnityIdNotProvidedError())

		return await this.manager.findAll(unity_id)
	}
}
