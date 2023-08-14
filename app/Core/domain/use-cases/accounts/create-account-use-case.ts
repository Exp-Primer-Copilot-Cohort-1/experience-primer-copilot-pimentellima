import LogDecorator from 'App/Core/decorators/log-decorator'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import type { IAccount } from 'Types/IAccount'
import { AccountManagerInterface } from '../../repositories/interface/account-manager-interface'

export class CreateAccountUseCase implements UseCase<IAccount, IAccount> {
	constructor(private readonly accountManager: AccountManagerInterface) { }

	@LogDecorator('accounts', 'post')
	public async execute(params: IAccount): PromiseEither<AbstractError, IAccount> {
		const newAccountOrErr = await this.accountManager.createAccount(params)

		if (newAccountOrErr.isLeft()) return left(newAccountOrErr.extract())
		const newActivity = newAccountOrErr.extract()
		return right(newActivity.params())
	}
}
