import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import ControllerInjection from 'App/Core/adapters/controller/ports/controller-injection'
import {
	CreateAccountUseCase,
	DeleteAccountByIdUseCase,
	FindAccountByIdUseCase,
	FindAllAccountUseCase,
	UpdateAccountByIdUseCase
} from 'App/Core/domain/use-cases/accounts'
import { IOptsQuery } from 'App/Types/IOptsQuery'

export const makeCreateAccountComposer = (): ControllerGeneric =>
	ControllerInjection.resolve(CreateAccountUseCase)

export const makeDeleteAccountComposer = (): ControllerGeneric =>
	ControllerInjection.resolve(DeleteAccountByIdUseCase)

export const makeFindAccountComposer = (): ControllerGeneric =>
	ControllerInjection.resolve(FindAccountByIdUseCase)

export const makeUpdateAccountByIdComposer = (): ControllerGeneric =>
	ControllerInjection.resolve(UpdateAccountByIdUseCase)

export const makeFindAllAccountsComposer = (opts: IOptsQuery): ControllerGeneric =>
	ControllerInjection.resolve(FindAllAccountUseCase, opts)
