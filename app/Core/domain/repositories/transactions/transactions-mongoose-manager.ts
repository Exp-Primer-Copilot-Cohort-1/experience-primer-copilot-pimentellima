import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, right } from 'App/Core/shared/either'
import Transactions from 'App/Models/Transactions'
import { ITransaction } from 'Types/ITransaction'
import { TransactionsManagerInterface } from '../interface/transactions-manager-interface'

export class TransactionsMongooseRepository implements TransactionsManagerInterface {
	public async create({
		_id, // eslint-disable-line @typescript-eslint/no-unused-vars
		...transaction
	}: Partial<ITransaction>): PromiseEither<AbstractError, ITransaction> {
		let doc = await Transactions.create({
			...transaction,
			prof: transaction.prof?.value,
			client: transaction.client?.value,
			cost_center: transaction.cost_center?.value,
			financial_category: transaction.financial_category?.value,
			account: transaction.account?.value,
		})

		doc = await doc.populate('prof client cost_center financial_category account', {
			label: '$name',
			value: '$_id',
			_id: 0,
		})

		return right(doc as unknown as ITransaction)
	}
}
