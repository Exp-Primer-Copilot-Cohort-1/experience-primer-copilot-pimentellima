import { AbstractError } from 'App/Core/errors/error.interface'
import { ISessionTransaction } from 'App/Core/infra/session-transaction'
import { PromiseEither, right } from 'App/Core/shared/either'
import Transactions from 'App/Models/Transactions'
import { ITransaction } from 'App/Types/ITransaction'
import { TransactionsManagerInterface } from '../interface/transactions-manager-interface'

export class TransactionsMongooseRepository implements TransactionsManagerInterface {
	constructor(private readonly session: ISessionTransaction) { } // eslint-disable-line

	public async create({
		_id, // eslint-disable-line @typescript-eslint/no-unused-vars
		...transaction
	}: Partial<ITransaction>): PromiseEither<AbstractError, ITransaction> {
		const created = await Transactions.create([transaction], {
			...this.session.options,
		})

		return right(created[0].toObject())
	}
}
