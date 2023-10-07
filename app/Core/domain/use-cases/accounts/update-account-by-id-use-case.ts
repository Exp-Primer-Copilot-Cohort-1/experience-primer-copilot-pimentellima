import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { IAccount } from 'App/Types/IAccount'
import { inject, injectable, registry } from "tsyringe"
import { MissingParamsError } from '../../errors'
import { AccountMongoRepository } from '../../repositories'
import { AccountManagerInterface } from '../../repositories/interface/account-manager-interface'

type TypeParams = {
	id: string
} & IAccount

@injectable()
@registry([{ token: UpdateAccountByIdUseCase, useClass: UpdateAccountByIdUseCase }])
export class UpdateAccountByIdUseCase implements UseCase<TypeParams, IAccount> {
	constructor(
		@inject(AccountMongoRepository) private readonly accountManager: AccountManagerInterface) {
	} // eslint-disable-line

	public async execute({
		id,
		...account
	}: TypeParams): PromiseEither<AbstractError, IAccount> {
		if (!id) return left(new MissingParamsError('id'))

		return await this.accountManager.update(account, id)
	}
}
