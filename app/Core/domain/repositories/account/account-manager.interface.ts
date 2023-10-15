import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { IAccount } from 'App/Types/IAccount'
import { ICount } from '../helpers/count'

export interface AccountManagerInterface {
	getCount: (unity_id: string) => PromiseEither<AbstractError, ICount>
	findAll: (unity_id: string) => PromiseEither<AbstractError, IAccount[]>
	create: (account: IAccount) => PromiseEither<AbstractError, IAccount>
	update: (
		account: IAccount,
		id: string,
	) => PromiseEither<AbstractError, IAccount>
	findByID: (id: string) => PromiseEither<AbstractError, IAccount>
	deleteByID: (id: string) => PromiseEither<AbstractError, IAccount>
}
