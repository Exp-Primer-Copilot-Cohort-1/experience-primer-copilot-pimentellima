import { Controller } from 'App/Core/adapters/controller';
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers';
import { AccountMongoRepository } from 'App/Core/domain/repositories/account/account-mongo-repository';
import { DeleteAccountByIdUseCase } from 'App/Core/domain/use-cases/accounts/delete-account-use-case';

export const makeDeleteAccountComposer = (): ControllerGeneric => {
	return new Controller(
		new DeleteAccountByIdUseCase(new AccountMongoRepository()),
	);
};
