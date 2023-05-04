import { Controller } from 'App/Core/adapters/controller';
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers';
import { AccountMongoRepository } from 'App/Core/domain/repositories/account/account-mongo-repository';
import { CreateAccountUseCase } from 'App/Core/domain/use-cases/accounts/create-account-use-case';

export const makeCreateAccountComposer = (): ControllerGeneric => {
	return new Controller(
		new CreateAccountUseCase(new AccountMongoRepository()),
	);
};
