import { AbstractError } from 'App/Core/errors/error.interface';
import { UseCase } from 'App/Core/interfaces/use-case.interface';
import { PromiseEither, left } from 'App/Core/shared';
import { MissingParamsError } from '../../errors/missing-params';
import { ProceduresManagerInterface } from '../../repositories/interface';
type FindAllProps = {
	name?: string;

	unity_id: string;
};

export class FindAllProceduresByUnityUseCase
	implements UseCase<FindAllProps, any[]>
{
	constructor(
		private readonly proceduresManager: ProceduresManagerInterface,
	) { }

	public async execute(
		input: FindAllProps,
	): PromiseEither<AbstractError, any[]> {
		if (!input?.unity_id) {
			return left(new MissingParamsError('unity_id'));
		}
		if (input.name) {
			const proceduresOrErr = await this.proceduresManager.findByName(
				input.name,
				input.unity_id,
			);
			if (proceduresOrErr.isLeft()) {
				return left(proceduresOrErr.extract());
			}

			return proceduresOrErr;
		}

		const proceduresOrErr = await this.proceduresManager.findById(
			input.unity_id,
		);
		if (proceduresOrErr.isLeft()) {
			return left(proceduresOrErr.extract());
		}
		return proceduresOrErr;
	}
}
