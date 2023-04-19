import { UseCase } from 'App/Core/interfaces/use-case.interface';
import { PromiseEither, left, right } from 'App/Core/shared/either';
import { IUnity } from 'Types/IUnity';

type IsValid = boolean;

export class UnityValidationUseCase
	implements UseCase<IUnity, undefined, IsValid>
{
	constructor() {}

	public async execute(unity: IUnity): PromiseEither<Error, IsValid> {
		const dateNow = new Date();

		if (!unity) {
			return left(new Error('Unidade não encontrada'));
		}

		if (
			unity.date_expiration &&
			new Date(unity.date_expiration) < dateNow
		) {
			return left(new Error('Unidade expirada'));
		}

		return right(true);
	}
}
