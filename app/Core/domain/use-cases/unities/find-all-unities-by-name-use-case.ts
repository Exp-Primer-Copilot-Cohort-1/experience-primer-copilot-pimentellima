import { AbstractError } from 'App/Core/errors/error.interface';
import { UseCase } from 'App/Core/interfaces/use-case.interface';
import { PromiseEither, left } from 'App/Core/shared';
import { UnitiesManagerInterface } from '../../repositories/interface';
type Input = {
	name: string;
};
export class FindAllUnityByNameUseCase implements UseCase<Input, any, any[]> {
	constructor(private readonly unityManager: UnitiesManagerInterface) { }

	public async execute({ name }: Input): PromiseEither<AbstractError, any[]> {
		const unitiesOrErr = await this.unityManager.findByName(name);

		if (unitiesOrErr.isLeft()) {
			return left(unitiesOrErr.extract());
		}

		return unitiesOrErr;
	}
}
