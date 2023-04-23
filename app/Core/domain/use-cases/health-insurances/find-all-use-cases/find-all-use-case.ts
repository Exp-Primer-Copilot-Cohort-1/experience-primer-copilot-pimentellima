/* eslint-disable no-unused-vars */
import { OptsQueryDefault } from 'App/Core/domain/use-cases/helpers/opts-query';
import { AbstractError } from 'App/Core/errors/error.interface';
import { UseCase } from 'App/Core/interfaces/use-case.interface';
import { PromiseEither } from 'App/Core/shared';

export class FindAllHealthInsuranceUseCase
	implements UseCase<OptsQueryDefault, any[]>
{
	constructor(
		private readonly findAllByName: UseCase<OptsQueryDefault, any[]>,
		private readonly findAllByUnity: UseCase<OptsQueryDefault, any[]>,
	) { }

	public async execute(
		opts: OptsQueryDefault,
	): PromiseEither<AbstractError, any[]> {
		if (opts?.name) {
			return this.findAllByName.execute(opts);
		}

		return this.findAllByUnity.execute(opts);
	}
}
