import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither } from 'App/Core/shared'
import type { IAccount } from 'App/Types/IAccount'
import { inject, injectable, registry } from 'tsyringe'
import { AccountManagerInterface } from '../../repositories/interface/account-manager-interface'

import { AccountMongoRepository } from '../../repositories'

@injectable()
@registry([{ token: CreateAccountUseCase, useClass: CreateAccountUseCase }])
export class CreateAccountUseCase implements UseCase<IAccount, IAccount> {
	constructor(
		@inject(AccountMongoRepository) private readonly manager: AccountManagerInterface) {
	} // eslint-disable-line

	async execute(params: IAccount): PromiseEither<AbstractError, IAccount> {
		return await this.manager.create(params)
	}
}