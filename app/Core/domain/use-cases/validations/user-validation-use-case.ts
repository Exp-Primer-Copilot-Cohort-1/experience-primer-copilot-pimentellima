import { UseCase } from 'App/Core/interfaces/use-case.interface';
import { PromiseEither, right } from 'App/Core/shared/either';
import { AbstractUser } from '../../entities/abstract/user.abstract';

type IsValid = boolean;

export class UserValidationUseCase
	implements UseCase<AbstractUser, undefined, IsValid>
{
	constructor() { }

	public async execute(user: AbstractUser): PromiseEither<Error, IsValid> {
		return right(true);
	}
}
