import { Controller } from 'App/Core/adapters/controller';
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers';
import { AccountMongoRepository } from 'App/Core/domain/repositories/account/account-mongo-repository';
import { UpdateAccountByIdUseCase } from 'App/Core/domain/use-cases/accounts/update-account-by-id-use-case';

export const makeUpdateAccountByIdComposer = (): ControllerGeneric => {
	return new Controller(
		new UpdateAccountByIdUseCase(new AccountMongoRepository()),
	);
};
