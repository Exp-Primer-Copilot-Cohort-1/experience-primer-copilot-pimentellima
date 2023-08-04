import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, right } from 'App/Core/shared/either'
import { ITransaction } from 'Types/ITransaction'
import { TransactionsManagerInterface } from '../interface/transactions-manager-interface'

export class TransactionsMongooseRepository implements TransactionsManagerInterface {
	public async create(
		transaction: ITransaction,
	): PromiseEither<AbstractError, ITransaction> {
		return right({} as ITransaction)
	}
}
