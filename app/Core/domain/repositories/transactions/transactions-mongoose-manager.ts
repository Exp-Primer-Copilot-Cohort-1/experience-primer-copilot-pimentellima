import { AbstractError } from 'App/Core/errors/error.interface'
import { ISessionTransaction } from 'App/Core/infra/infra'
import { SessionTransaction } from 'App/Core/infra/session-transaction'
import { PromiseEither, right } from 'App/Core/shared/either'
import Transactions from 'App/Models/Transactions'
import { ITransaction } from 'App/Types/ITransaction'
import { inject, injectable, registry } from 'tsyringe'
import { TransactionsManagerContract } from '../interface/transactions-manager-interface'

@injectable()
@registry([{ token: TransactionsMongooseRepository, useClass: TransactionsMongooseRepository }])
export class TransactionsMongooseRepository implements TransactionsManagerContract {
	constructor(
		@inject(SessionTransaction) private readonly session: ISessionTransaction
	) { } // eslint-disable-line

	async create({
		_id, // eslint-disable-line @typescript-eslint/no-unused-vars
		...transaction
	}: Partial<ITransaction>): PromiseEither<AbstractError, ITransaction> {
		const created = await Transactions.create([transaction], {
			...this.session.options,
		})

		return right(created[0].toObject())
	}


	async update(
		id: string,
		data: Partial<ITransaction>
	): PromiseEither<AbstractError, Count> {

		const transaction = await Transactions.updateMany(
			{ $or: [{ _id: id }, { group_by: id }] },
			data,
			{
				new: true,
			},
		).orFail()

		return right(transaction.modifiedCount)
	}
}
