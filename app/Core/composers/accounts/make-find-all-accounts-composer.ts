import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { AccountMongoRepository } from 'App/Core/domain/repositories/account/account-mongo-repository'
import { FindAllAccountUseCase } from 'App/Core/domain/use-cases/accounts/find-all-accounts-use-case'

export const makeFindAllAccountsComposer = (): ControllerGeneric => {
	return new Controller(new FindAllAccountUseCase(new AccountMongoRepository()))
}
