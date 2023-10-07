import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import ControllerInjection from 'App/Core/adapters/controller/ports/controller-injection'
import { OptsQuery } from 'App/Core/domain/entities/helpers/opts-query'
import {
	CreateAccountUseCase,
	DeleteAccountByIdUseCase,
	FindAccountByIdUseCase,
	FindAllAccountUseCase,
	UpdateAccountByIdUseCase
} from 'App/Core/domain/use-cases/accounts'

export const makeCreateAccountComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(CreateAccountUseCase)
}

export const makeDeleteAccountComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(DeleteAccountByIdUseCase)
};


export const makeFindAccountComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(FindAccountByIdUseCase)
};

export const makeUpdateAccountByIdComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(UpdateAccountByIdUseCase)
};

export const makeFindAllAccountsComposer = (opts: OptsQuery): ControllerGeneric => {
	return ControllerInjection.resolve(FindAllAccountUseCase, opts)
}
