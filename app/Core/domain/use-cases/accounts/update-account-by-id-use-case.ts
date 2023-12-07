import AccountEntity from 'App/Core/domain/entities/account/account'
import { IdNotProvidedError } from 'App/Core/domain/errors/id-not-provided'
import { AccountMongoRepository } from 'App/Core/domain/repositories'
import { AccountManagerContract } from 'App/Core/domain/repositories/account/account-manager.interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { IAccount } from 'App/Types/IAccount'
import { inject, injectable, registry } from "tsyringe"

type TypeParams = {
	id: string
} & IAccount

@injectable()
@registry([{ token: UpdateAccountByIdUseCase, useClass: UpdateAccountByIdUseCase }])
export class UpdateAccountByIdUseCase implements UseCase<TypeParams, IAccount> {
	constructor(
		@inject(AccountMongoRepository) private readonly manager: AccountManagerContract) {
	} // eslint-disable-line

	public async execute({
		id,
		...data
	}: TypeParams): PromiseEither<AbstractError, IAccount> {
		if (!id) return left(new IdNotProvidedError())

		const entityOrErr = await AccountEntity.build(data)

		if (entityOrErr.isLeft()) return left(entityOrErr.extract())

		const account = entityOrErr.extract()

		return await this.manager.update(account, id)
	}
}
