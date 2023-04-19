import { UnitiesManagerInterface } from 'App/Core/domain/repositories/interface';
import { UseCase } from 'App/Core/interfaces/use-case.interface';
import { PromiseEither, left, right } from 'App/Core/shared';
import { IUnity } from 'Types/IUnity';

export class FindAllUnitiesUseCase
	implements UseCase<undefined, undefined, IUnity[]>
{
	constructor(private readonly unitiesManager: UnitiesManagerInterface) { }

	public async execute(): PromiseEither<Error, IUnity[]> {
		const unities = await this.unitiesManager.findAll();

		if (unities.isLeft()) {
			return left(new Error('Unities not found'));
		}

		return right(unities.extract());
	}
}
