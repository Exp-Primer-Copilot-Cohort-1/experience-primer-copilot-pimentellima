import { UnitNotFoundError } from 'App/Core/domain/errors/unit-not-found';
import { UnitiesManagerInterface } from 'App/Core/domain/repositories/interface';
import { AbstractError } from 'App/Core/errors/error.interface';
import { UseCase } from 'App/Core/interfaces/use-case.interface';
import { PromiseEither, left, right } from 'App/Core/shared';
import { IUnity } from 'Types/IUnity';

export class FindAllUnitiesUseCase
	implements UseCase<undefined, undefined, IUnity[]>
{
	constructor(private readonly unitiesManager: UnitiesManagerInterface) { }

	public async execute(): PromiseEither<AbstractError, IUnity[]> {
		const unities = await this.unitiesManager.findAll();

		if (unities.isLeft()) {
			return left(new UnitNotFoundError());
		}

		return right(unities.extract());
	}
}
