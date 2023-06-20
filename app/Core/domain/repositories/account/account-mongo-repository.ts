import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import Account from 'App/Models/Account'
import { IAccount } from 'Types/IAccount'
import AccountEntity from '../../entities/account/account'
import { AccountNotFoundError } from '../../errors/account-not-found-error'
import { InvalidParamsError } from '../../errors/invalid-params-error'
import { MissingParamsError } from '../../errors/missing-params'
import { AccountManagerInterface } from '../interface/account-manager-interface'

export class AccountMongoRepository implements AccountManagerInterface {
	constructor() { }

	async findAllAccounts(unity_id: string): PromiseEither<AbstractError, IAccount[]> {
		if (!unity_id) return left(new MissingParamsError('unity id'))

		const data = await Account.find({ unity_id })
		const accounts = await Promise.all(
			data.map(async (item) => {
				const accountOrErr = await AccountEntity.build(item.toObject())
				if (accountOrErr.isLeft()) {
					return {} as AccountEntity
				}
				return accountOrErr.extract().params()
			}),
		)
		return right(accounts)
	}

	async createAccount(account: IAccount): PromiseEither<AbstractError, AccountEntity> {
		const newAccountOrErr = await AccountEntity.build(account)
		if (newAccountOrErr.isLeft()) return left(newAccountOrErr.extract())
		const newAccount = newAccountOrErr.extract()

		const { _id } = await Account.create(newAccount.params())
		newAccount.defineId(_id.toString())
		return right(newAccount)
	}

	async updateAccountById(
		account: IAccount,
		id: string,
	): PromiseEither<AbstractError, AccountEntity> {
		if (!id) return left(new MissingParamsError('id'))
		const oldAccount = await Account.findById(id)
		if (!oldAccount) return left(new AccountNotFoundError())
		const newAccountOrErr = await AccountEntity.build({
			...oldAccount.toObject(),
			...account,
		})
		if (newAccountOrErr.isLeft())
			return left(new AbstractError('Invalid params', 400))
		const newAccount = newAccountOrErr.extract()

		await Account.findByIdAndUpdate(id, newAccount.params())
		return right(newAccount)
	}

	async findAccountById(id: string): PromiseEither<AbstractError, AccountEntity> {
		if (!id) return left(new MissingParamsError('id'))

		const item = await Account.findById(id)
		if (!item) return left(new AccountNotFoundError())

		const accountOrErr = await AccountEntity.build(item.toObject())
		if (accountOrErr.isLeft()) return left(new InvalidParamsError())

		return right(accountOrErr.extract())
	}

	async deleteAccountById(id: string): PromiseEither<AbstractError, AccountEntity> {
		if (!id) return left(new MissingParamsError('id'))

		const item = await Account.findByIdAndDelete(id)
		if (!item) return left(new AccountNotFoundError())

		const accountOrErr = await AccountEntity.build(item.toObject())
		if (accountOrErr.isLeft()) return left(new AbstractError('Invalid params', 400))

		return right(accountOrErr.extract())
	}
}
