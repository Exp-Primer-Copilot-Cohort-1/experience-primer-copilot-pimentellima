import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { DeleteAccountByIdUseCase } from 'App/Core/domain/use-cases/accounts'
import { CreateAccountUseCase } from 'App/Core/domain/use-cases/accounts/create-account-use-case'

export const makeCreateAccountComposer = (): ControllerGeneric => {
	return new Controller(new CreateAccountUseCase())
}


export const makeDeleteAccountComposer = (): ControllerGeneric => {
	return new Controller(
		new DeleteAccountByIdUseCase(),
	);
};
