import ProcedureEnt, {
	IProcedureEnt,
} from 'App/Core/domain/entities/procedures/procedure';
import { AbstractError } from 'App/Core/errors/error.interface';
import { UseCase } from 'App/Core/interfaces/use-case.interface';
import { PromiseEither, right } from 'App/Core/shared';

import { ProceduresManagerInterface } from '../../../repositories/interface';

export class CreateProceduresUseCase
	implements UseCase<IProcedureEnt, ProcedureEnt>
{
	constructor(
		private readonly proceduresManager: ProceduresManagerInterface,
	) { }

	public async execute(
		body: IProcedureEnt,
	): PromiseEither<AbstractError, ProcedureEnt> {
		return right({} as ProcedureEnt);
	}
}
