import { isValidObjectId } from '@ioc:Mongoose'
import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import Account from 'App/Models/Account'
import { IAccount } from 'App/Types/IAccount'
import AccountEntity from '../../entities/account/account'
import { AccountNotFoundError, UnitNotFoundError } from '../../errors'
import { AccountManagerInterface } from '../interface/account-manager-interface'
export class AccountMongoRepository implements AccountManagerInterface {
	constructor() { } // eslint-disable-line

	async findAllAccounts(unity_id: string): PromiseEither<AbstractError, IAccount[]> {
		if (!unity_id) return left(new UnitNotFoundError())

		const data = await Account.find({ unity_id })

		return right(data)
	}

	async createAccount({
		_id, // eslint-disable-line
		...account
	}: IAccount): PromiseEither<AbstractError, AccountEntity> {
		const entityOrErr = await AccountEntity.build(account)

		if (entityOrErr.isLeft()) return entityOrErr

		const newAccount = entityOrErr.extract().params()

		const created = await Account.create(newAccount)

		return right(created.toObject())
	}

	async updateAccountById(
		account: IAccount,
		id: string,
	): PromiseEither<AbstractError, IAccount> {
		if (!id) return left(new AccountNotFoundError())

		const doc = await Account.findByIdAndUpdate(id, account, { new: true }).orFail()

		return right(doc?.toObject())
	}

	async findAccountById(id: string): PromiseEither<AbstractError, AccountEntity> {
		if (!id || !isValidObjectId(id)) return left(new AccountNotFoundError())

		const item = await Account.findById(id).orFail(new AccountNotFoundError())

		return right(item.toObject())
	}

	async deleteAccountById(id: string): PromiseEither<AbstractError, AccountEntity> {
		if (!id) return left(new AccountNotFoundError())

		const doc = await Account.findByIdAndDelete(id).orFail(new AccountNotFoundError())

		return right(doc.toObject())
	}
}
