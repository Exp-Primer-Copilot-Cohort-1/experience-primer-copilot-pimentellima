import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { IAccount } from 'App/Types/IAccount'

export interface AccountManagerContract {
	findAll: (unity_id: string) => PromiseEither<AbstractError, IAccount[]>
	create: (account: IAccount) => PromiseEither<AbstractError, IAccount>
	update: (
		account: IAccount,
		id: string,
	) => PromiseEither<AbstractError, IAccount>
	findById: (id: string) => PromiseEither<AbstractError, IAccount>
	deleteById: (id: string) => PromiseEither<AbstractError, IAccount>
}
