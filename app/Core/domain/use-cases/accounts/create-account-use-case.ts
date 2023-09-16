import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither } from 'App/Core/shared'
import type { IAccount } from 'App/Types/IAccount'
import { AccountManagerInterface } from '../../repositories/interface/account-manager-interface'

export class CreateAccountUseCase implements UseCase<IAccount, IAccount> {
	constructor(private readonly accountManager: AccountManagerInterface) { } // eslint-disable-line

	public async execute(params: IAccount): PromiseEither<AbstractError, IAccount> {
		const newAccountOrErr = await this.accountManager.createAccount(params)

		return newAccountOrErr
	}
}
