import { isValidObjectId } from '@ioc:Mongoose'
import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import Account from 'App/Models/Account'
import { IAccount } from 'App/Types/IAccount'
import { inject, injectable, registry } from "tsyringe"
import AccountEntity from '../../entities/account/account'
import { OptsQuery } from '../../entities/helpers/opts-query'
import { AccountNotFoundError, UnityNotFoundError } from '../../errors'
import { ICount } from '../helpers/count'
import { AccountManagerInterface } from '../interface/account-manager-interface'
@injectable()
@registry([{ token: AccountMongoRepository, useClass: AccountMongoRepository }])
export class AccountMongoRepository implements AccountManagerInterface {

	constructor(
		@inject(OptsQuery) private readonly opts: OptsQuery
	) { } // eslint-disable-line


	async getCount(unity_id: string): PromiseEither<AbstractError, ICount> {
		const count = await Account.countDocuments({ unity_id })
			.where({ active: this.opts.active })
			.exec()

		return right({ count })
	}

	async findAll(unity_id: string): PromiseEither<AbstractError, IAccount[]> {
		if (!unity_id) return left(new UnityNotFoundError())

		const data = await Account.find({
			unity_id,
			active: this.opts.active,
		})
			.skip(this.opts.skip as number)
			.limit(this.opts.limit as number)
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

	async findByID(id: string): PromiseEither<AbstractError, AccountEntity> {
		if (!id || !isValidObjectId(id)) return left(new AccountNotFoundError())

		const item = await Account.findById(id).orFail(new AccountNotFoundError())

		return right(item.toObject())
	}

	async deleteByID(id: string): PromiseEither<AbstractError, AccountEntity> {
		if (!id) return left(new AccountNotFoundError())

		const doc = await Account.findByIdAndDelete(id).orFail(new AccountNotFoundError())

		return right(doc.toObject())
	}
}

