import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { ITransaction } from 'App/Types/ITransaction'

export interface TransactionsManagerContract {
	create: (
		transaction: ITransaction,
		unity_id: string,
	) => PromiseEither<AbstractError, ITransaction>

	update: (
		id: string,
		transaction: ITransaction,
	) => PromiseEither<AbstractError, Count>
}
