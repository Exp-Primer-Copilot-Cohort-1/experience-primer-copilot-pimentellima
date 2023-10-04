import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { IAccount } from 'App/Types/IAccount'
import { MissingParamsError } from '../../errors'
import { AccountManagerInterface } from '../../repositories/interface/account-manager-interface'

type TypeParams = {
	id: string
} & IAccount

export class UpdateAccountByIdUseCase implements UseCase<TypeParams, IAccount> {
	constructor(private readonly accountManager: AccountManagerInterface) { } // eslint-disable-line

	public async execute({
		id,
		...account
	}: TypeParams): PromiseEither<AbstractError, IAccount> {
		if (!id) return left(new MissingParamsError('id'))

		return await this.accountManager.update(account, id)
	}
}
