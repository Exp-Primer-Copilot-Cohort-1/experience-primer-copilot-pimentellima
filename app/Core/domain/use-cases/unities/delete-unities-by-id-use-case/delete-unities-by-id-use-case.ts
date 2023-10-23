import { MissingParamsError } from 'App/Core/domain/errors/missing-params';
import { UnitiesManagerContract } from 'App/Core/domain/repositories/interface';
import { AbstractError } from 'App/Core/errors/error.interface';
import { UseCase } from 'App/Core/interfaces/use-case.interface';
import { PromiseEither, left } from 'App/Core/shared';

type Input = {
	id: string;
};

export class DeleteUnitiesByIdUseCase implements UseCase<Input, any> {
	constructor(private readonly unityManager: UnitiesManagerContract) { }

	public async execute(input: Input): PromiseEither<AbstractError, any> {
		if (!input?.id) {
			return left(new MissingParamsError('id'));
		}

		const unitiesOrErr = await this.unityManager.deleteById(input.id);

		return unitiesOrErr;
	}
}
