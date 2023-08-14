import LogDecorator from 'App/Core/decorators/log-decorator'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IAccount } from 'Types/IAccount'
import { AccountManagerInterface } from '../../repositories/interface/account-manager-interface'

type TypeParams = {
	id: string
} & IAccount

export class UpdateAccountByIdUseCase implements UseCase<TypeParams, IAccount> {
	constructor(private readonly accountManager: AccountManagerInterface) { }

	@LogDecorator('accounts', 'put')
	public async execute({
		id,
		...account
	}: TypeParams): PromiseEither<AbstractError, IAccount> {
		const accountOrErr = await this.accountManager.updateAccountById(account, id)

		if (accountOrErr.isLeft()) return left(accountOrErr.extract())
		const doc = accountOrErr.extract()
		return right(doc)
	}
}
