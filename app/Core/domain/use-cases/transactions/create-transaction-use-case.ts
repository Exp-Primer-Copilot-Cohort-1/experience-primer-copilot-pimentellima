import { TransactionEntity } from 'App/Core/domain/entities/transaction/TransactionEntity'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import divideCurrencyByInteger from 'App/utils/divide-currency'
import { ITransaction } from 'Types/ITransaction'
import { addMonths } from 'date-fns'
import { Types } from 'mongoose'
import { UnitNotFoundError } from '../../errors/unit-not-found'
import { TransactionsManagerInterface } from '../../repositories/interface/transactions-manager-interface'

export class CreateTransactionUseCase implements UseCase<ITransaction, ITransaction> {
	constructor(private readonly manager: TransactionsManagerInterface) { }

	public async execute({
		unity_id,
		installments,
		...transaction
	}: ITransaction): PromiseEither<AbstractError, ITransaction> {
		if (!unity_id) return left(new UnitNotFoundError())

		const numberOfTransactions = installments ? installments : 1
		const validatedTransactions: ITransaction[] = []

		const group_by = transaction.group_by || new Types.ObjectId()

		for (
			let currentTransaction = 0;
			currentTransaction < numberOfTransactions;
			currentTransaction++
		) {
			const date = addMonths(new Date(transaction.date), currentTransaction)
			const transactionOrErr = await TransactionEntity.build({
				...transaction,
				group_by: group_by.toString(),
				unity_id: unity_id.toString(),
				value: divideCurrencyByInteger(transaction.value, numberOfTransactions),
				installments: numberOfTransactions,
				installmentCurrent: currentTransaction + 1,
				date,
			})
			if (transactionOrErr.isLeft()) return left(transactionOrErr.extract())
			else validatedTransactions.push(transactionOrErr.extract())
		}

		const transactions = await Promise.all(
			validatedTransactions.map(async (transaction) =>
				this.manager.create(transaction, unity_id.toString()),
			),
		)

		return right(transactions[0].extract() as ITransaction)
	}
}
