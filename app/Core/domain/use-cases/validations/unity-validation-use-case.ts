import { AbstractError } from 'App/Core/errors/error.interface';
import { UseCase } from 'App/Core/interfaces/use-case.interface';
import { PromiseEither, left, right } from 'App/Core/shared/either';
import { IUnity } from 'Types/IUnity';
import { UnitDateExpiredError } from '../../errors/unit-date-expired';
import { UnitNotFoundError } from '../../errors/unit-not-found';

type IsValid = boolean;

export class UnityValidationUseCase
	implements UseCase<IUnity, undefined, IsValid>
{
	constructor() { }

	public async execute(unity: IUnity): PromiseEither<AbstractError, IsValid> {
		const dateNow = new Date();

		if (!unity) {
			return left(new UnitNotFoundError());
		}

		if (
			unity.date_expiration &&
			new Date(unity.date_expiration) < dateNow
		) {
			return left(new UnitDateExpiredError());
		}

		return right(true);
	}
}
