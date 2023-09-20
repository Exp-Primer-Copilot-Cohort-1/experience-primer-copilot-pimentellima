import { TransactionEntity } from 'App/Core/domain/entities/transaction/TransactionEntity'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IActivity } from 'App/Types/IActivity'
import { addMonths } from 'date-fns'

import { ISessionTransaction } from 'App/Core/helpers/session-transaction'
import type { ITransaction } from 'App/Types/ITransaction'
import divideCurrencyByInteger from 'App/utils/divide-currency'
import { Types } from 'mongoose'
import { UnitNotFoundError } from '../../../errors/unit-not-found'
import { TransactionWithProcedure, TransactionWithoutProcedure } from '../helpers'

export class CreateTransactionUseCase implements UseCase<ITransaction, ITransaction> {
	constructor(
		private readonly withoutProcedure: UseCase<
			TransactionWithoutProcedure,
			ITransaction
		>,
		private readonly withProcedures: UseCase<TransactionWithProcedure, ITransaction>,
		private readonly withActivity: UseCase<TransactionWithoutProcedure, IActivity>,
		private readonly session: ISessionTransaction,
	) { } // eslint-disable-line

	public async execute({
		unity_id,
		installments = 1,
		procedures = [],
		activity_id,
		...transaction
	}: ITransaction): PromiseEither<AbstractError, ITransaction> {
		if (!unity_id) return left(new UnitNotFoundError())
		await this.session.startSession()
		try {
			const total = divideCurrencyByInteger(transaction.amount, installments)
			const group_by = activity_id || transaction.group_by || new Types.ObjectId()

			const transactions: ITransaction[] = []
			for (let index = 0; index < installments; index++) {
				const date = addMonths(new Date(transaction.date), index)

				const transactionOrErr = await TransactionEntity.build({
					...transaction,
					group_by: group_by.toString(),
					unity_id: unity_id.toString(),
					amount: total,
					installments,
					procedures,
					installmentCurrent: index + 1,
					date,
				})

				if (transactionOrErr.isLeft()) throw transactionOrErr.extract()

				const entity = transactionOrErr.extract()

				const withProcedures = await this.withProcedures.execute(entity as any)

				if (withProcedures.isRight()) {
					transactions.push(withProcedures.extract())
				} else {
					const transactionOneOrErr = await this.withoutProcedure.execute(
						entity,
					)
					if (transactionOneOrErr.isLeft()) throw transactionOneOrErr.extract()
					transactions.push(transactionOneOrErr.extract())
				}
			}

			const createdWithActivity = await this.withActivity.execute({
				...transaction,
				activity_id,
				installments,
				unity_id,
			})

			// Caso seja uma atividade e não tenha sido criada, então retorna left
			if (createdWithActivity.isLeft() && activity_id) {
				throw createdWithActivity.extract()
			}

			await this.session.commitTransaction()

			return right(transactions[0])
		} catch (error) {
			await this.session.abortTransaction()
			return left(error)
		}
	}
}
