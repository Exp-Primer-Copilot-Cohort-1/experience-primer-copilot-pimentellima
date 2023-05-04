import { Controller } from 'App/Core/adapters/controller';
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers';
import { AccountMongoRepository } from 'App/Core/domain/repositories/account/account-mongo-repository';
import { UpdateAccountUseCase } from 'App/Core/domain/use-cases/accounts/update-account-use-case';

export const makeUpdateAccountComposer = (): ControllerGeneric => {
	return new Controller(
		new UpdateAccountUseCase(new AccountMongoRepository()),
	);
};
