import LogDecorator, { ACTION } from 'App/Core/decorators/log-decorator'
import { TransactionEntity } from 'App/Core/domain/entities/transaction/TransactionEntity'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { COLLECTION_NAME } from 'App/Models/Transactions'
import { IActivity } from 'App/Types/IActivity'
import { addMonths } from 'date-fns'

import type { ITransaction } from 'App/Types/ITransaction'
import divideCurrencyByInteger from 'App/utils/divide-currency'
import { Types } from 'mongoose'
import { UnitNotFoundError } from '../../../errors/unit-not-found'
import { TransactionWithProcedure, TransactionWithoutProcedure } from '../helpers'

export class CreateTransactionUseCase implements UseCase<ITransaction, ITransaction> {
	constructor(
		private readonly createWithoutProcedure: UseCase<
			TransactionWithoutProcedure,
			ITransaction
		>,
		private readonly createWithProcedure: UseCase<
			TransactionWithProcedure,
			ITransaction
		>,
		private readonly createWithActivity: UseCase<
			TransactionWithoutProcedure,
			IActivity
		>,
	) { } // eslint-disable-line

	@LogDecorator(COLLECTION_NAME, ACTION.POST)
	public async execute({
		unity_id,
		installments = 1,
		procedures = [],
		activity_id,
		...transaction
	}: ITransaction): PromiseEither<AbstractError, ITransaction> {
		if (!unity_id) return left(new UnitNotFoundError())

		const total = divideCurrencyByInteger(transaction.amount, installments)
		const group_by = activity_id || transaction.group_by || new Types.ObjectId()

		const createdWithActivity = await this.createWithActivity.execute({
			...transaction,
			activity_id,
			installments,
			unity_id,
		})

		// Caso seja uma atividade e não tenha sido criada, então retorna left
		if (createdWithActivity.isLeft() && activity_id) {
			throw createdWithActivity.extract()
		}

		const transactions: ITransaction[] = await Promise.all(
			Array.from({ length: installments }).map(async (_, index) => {
				const date = addMonths(new Date(transaction.date), index)

				const transactionOrErr = await TransactionEntity.build({
					...transaction,
					group_by: group_by.toString(),
					unity_id: unity_id.toString(),
					amount: total,
					installments,
					installmentCurrent: index + 1,
					date,
				})
				if (transactionOrErr.isLeft()) throw transactionOrErr.extract()

				const t = transactionOrErr.extract()

				// Este caso de uso trata de criar uma transação com procedimentos
				// caso não haja procedimentos, então ele retorna left e continua
				const withProcedures = await this.createWithProcedure.execute({
					...t,
					procedures,
				})

				if (withProcedures.isRight()) return withProcedures.extract()

				// Caso não haja procedimentos, então ele retorna left e continua
				// a criação da transação sem procedimentos
				const transactionOnlyOneOrErr = await this.createWithoutProcedure.execute(
					{ ...t, procedures },
				)

				if (transactionOnlyOneOrErr.isLeft())
					throw transactionOnlyOneOrErr.extract()

				return transactionOnlyOneOrErr.extract()
			}),
		)

		return right(transactions[0])
	}
}
