import { TransactionEntity } from 'App/Core/domain/entities/transaction/TransactionEntity'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import divideCurrencyByInteger from 'App/utils/divide-currency'
import { ITransaction } from 'Types/ITransaction'
import { addMonths } from 'date-fns'
import { Types } from 'mongoose'
import { UnitNotFoundError } from '../../../errors/unit-not-found'
import { TransactionWithProcedure, TransactionWithoutProcedure } from '../helpers'

export class CreateTransactionUseCase implements UseCase<ITransaction, ITransaction> {
	constructor(
		private readonly createOnlyOne: UseCase<
			TransactionWithoutProcedure,
			ITransaction
		>,
		private readonly createWithProcedure: UseCase<
			TransactionWithProcedure,
			ITransaction
		>,
	) { }

	public async execute({
		unity_id,
		installments,
		procedures = [],
		...transaction
	}: ITransaction): PromiseEither<AbstractError, ITransaction> {
		if (!unity_id) return left(new UnitNotFoundError())

		const numberOfTransactions = installments ? installments : 1
		const value = divideCurrencyByInteger(transaction.value, numberOfTransactions)

		const group_by = transaction.group_by || new Types.ObjectId()

		const transactions: ITransaction[] = await Promise.all(
			Array.from({ length: numberOfTransactions }).map(async (_, index) => {
				const date = addMonths(new Date(transaction.date), index)
				const transactionOrErr = await TransactionEntity.build({
					...transaction,
					group_by: group_by.toString(),
					unity_id: unity_id.toString(),
					value,
					installments: numberOfTransactions,
					installmentCurrent: index + 1,
					date,
				})
				if (transactionOrErr.isLeft()) throw transactionOrErr.extract()

				const t = transactionOrErr.extract().params() as ITransaction

				if (procedures?.length > 0) {
					const transactionWithProcedureOrErr =
						await this.createWithProcedure.execute({
							...t,
							procedures,
						} as TransactionWithProcedure)
					if (transactionWithProcedureOrErr.isLeft())
						throw transactionWithProcedureOrErr.extract()
					return transactionWithProcedureOrErr.extract()
				}

				const transactionOnlyOneOrErr = await this.createOnlyOne.execute(t)

				if (transactionOnlyOneOrErr.isLeft())
					throw transactionOnlyOneOrErr.extract()

				return transactionOnlyOneOrErr.extract()
			}),
		)

		return right(transactions[0] as ITransaction)
	}
}
