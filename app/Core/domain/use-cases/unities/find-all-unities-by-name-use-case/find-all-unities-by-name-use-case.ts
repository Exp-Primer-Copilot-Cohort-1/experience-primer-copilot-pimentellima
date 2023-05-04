import { MissingParamsError } from 'App/Core/domain/errors/missing-params';
import { UnitiesManagerInterface } from 'App/Core/domain/repositories/interface';
import { AbstractError } from 'App/Core/errors/error.interface';
import { UseCase } from 'App/Core/interfaces/use-case.interface';
import { PromiseEither, left } from 'App/Core/shared';

type Input = {
	name?: string;
};

export class FindAllUnityByNameUseCase implements UseCase<Input, any[]> {
	constructor(private readonly unityManager: UnitiesManagerInterface) { }

	public async execute(input: Input): PromiseEither<AbstractError, any[]> {
		if (!input?.name) {
			return left(new MissingParamsError('name'));
		}
		const unitiesOrErr = await this.unityManager.findByName(input.name);

		if (unitiesOrErr.isLeft()) {
			return left(unitiesOrErr.extract());
		}

		return unitiesOrErr;
	}
}
