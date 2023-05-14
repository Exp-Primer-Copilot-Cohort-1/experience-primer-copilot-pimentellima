import { Controller } from 'App/Core/adapters/controller';
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers';
import { AccountMongoRepository } from 'App/Core/domain/repositories/account/account-mongo-repository';
import { FindAccountByIdUseCase } from 'App/Core/domain/use-cases/accounts/find-account-by-id-use-case';

export const makeFindAccountComposer = (): ControllerGeneric => {
	return new Controller(
		new FindAccountByIdUseCase(new AccountMongoRepository()),
	);
};
