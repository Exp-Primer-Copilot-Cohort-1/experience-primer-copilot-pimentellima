import { isValidObjectId } from '@ioc:Mongoose'
import AccountEntity from 'App/Core/domain/entities/account/account'
import { OptsQuery } from 'App/Core/domain/entities/helpers/opts-query'
import { AccountNotFoundError, UnityNotFoundError } from 'App/Core/domain/errors'
import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import Account from 'App/Models/Account'
import { IAccount } from 'App/Types/IAccount'
import { inject, injectable, registry } from "tsyringe"
import { AccountManagerContract } from './account-manager.interface'
@injectable()
@registry([{ token: AccountMongoRepository, useClass: AccountMongoRepository }])
export class AccountMongoRepository implements AccountManagerContract {

	constructor(
		@inject(OptsQuery) private readonly opts: OptsQuery
	) { } // eslint-disable-line

	async findAll(unity_id: string): PromiseEither<AbstractError, IAccount[]> {
		if (!unity_id) return left(new UnityNotFoundError())

		const data = await Account.find({
			unity_id,
			active: this.opts.active,
		})
			.sort(this.opts.sort)
			.skip(this.opts.skip)
			.limit(this.opts.limit)
			.exec()

		return right(data)
	}

	async create({
		_id, // eslint-disable-line
		...account
	}: IAccount): PromiseEither<AbstractError, AccountEntity> {
		const entityOrErr = await AccountEntity.build(account)

		if (entityOrErr.isLeft()) return entityOrErr

		const newAccount = entityOrErr.extract()

		const created = await Account.create(newAccount)

		return right(created.toObject())
	}

	async update(
		account: IAccount,
		id: string,
	): PromiseEither<AbstractError, IAccount> {
		if (!id) return left(new AccountNotFoundError())

		const doc = await Account.findByIdAndUpdate(id, account, { new: true }).orFail()

		return right(doc?.toObject())
	}

	async findById(id: string): PromiseEither<AbstractError, AccountEntity> {
		if (!id || !isValidObjectId(id)) return left(new AccountNotFoundError())

		const item = await Account.findById(id).orFail(new AccountNotFoundError())

		return right(item.toObject())
	}

	async deleteById(id: string): PromiseEither<AbstractError, AccountEntity> {
		if (!id) return left(new AccountNotFoundError())

		const doc = await Account.findByIdAndDelete(id).orFail(new AccountNotFoundError())

		return right(doc.toObject())
	}
}

