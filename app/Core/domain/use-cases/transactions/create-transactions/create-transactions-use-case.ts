import { TransactionEntity } from 'App/Core/domain/entities/transaction/TransactionEntity'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IActivity } from 'App/Types/IActivity'
import { addMonths } from 'date-fns'

import { ISessionTransaction } from 'App/Core/infra/session-transaction'
import type { ITransaction } from 'App/Types/ITransaction'
import divideCurrencyByInteger from 'App/utils/divide-currency'
import { Types } from 'mongoose'
import { UnitNotFoundError } from '../../../errors/unit-not-found'
import { TransactionWithProcedure, TransactionWithoutProcedure } from '../helpers'

/**
 * Classe responsável por criar transações.
 */
export class CreateTransactionUseCase implements UseCase<ITransaction, ITransaction> {
	/**
	 * Construtor da classe.
	 * @param withoutProcedure UseCase para criar transação sem procedimentos.
	 * @param withProcedures UseCase para criar transação com procedimentos.
	 * @param withActivity UseCase para criar atividade.
	 * @param session Sessão de transação.
	 */
	constructor(
		private readonly withoutProcedure: UseCase<
			TransactionWithoutProcedure,
			ITransaction
		>,
		private readonly withProcedures: UseCase<TransactionWithProcedure, ITransaction>,
		private readonly withActivity: UseCase<TransactionWithoutProcedure, IActivity>,
		private readonly session: ISessionTransaction,
	) { } // eslint-disable-line

	/**
	 * Cria transações.
	 * @param transaction Transação.
	 * @param installments Parcelas.
	 * @param group_by Agrupamento.
	 * @param amount Valor.
	 * @param unity_id Identificador da unidade.
	 * @returns Lista de transações.
	 */
	private async createTransactions(
		transaction: ITransaction,
		installments: number,
		group_by: string,
		amount: number,
		unity_id: string,
	): Promise<ITransaction[]> {
		const transactions: ITransaction[] = []

		for (let index = 0; index < installments; index++) {
			const date = addMonths(new Date(transaction.date as Date), index)

			const transactionOrErr = await TransactionEntity.build({
				...transaction,
				group_by,
				unity_id,
				amount,
				installments,
				installmentCurrent: index + 1,
				date,
			})

			if (transactionOrErr.isLeft()) throw transactionOrErr.extract()

			const entity = transactionOrErr.extract()

			const withProceduresResult = await this.withProcedures.execute(entity)

			if (withProceduresResult.isRight()) {
				transactions.push(withProceduresResult.extract())
				continue
			}

			const transactionOneOrErr = await this.withoutProcedure.execute(entity)
			if (transactionOneOrErr.isLeft()) throw transactionOneOrErr.extract()
			transactions.push(transactionOneOrErr.extract())
		}

		return transactions
	}

	/**
	 * Executa a criação de transações.
	 * @param unity_id Identificador da unidade.
	 * @param installments Parcelas.
	 * @param activity_id Identificador da atividade.
	 * @param transaction Transação.
	 * @returns Transação criada.
	 */
	async execute({
		unity_id,
		installments = 1,
		activity_id,
		...transaction
	}: ITransaction): PromiseEither<AbstractError, ITransaction> {
		if (!unity_id) return left(new UnitNotFoundError())
		await this.session.startSession()
		try {
			const total = divideCurrencyByInteger(transaction.amount, installments)
			const group_by = activity_id || transaction.group_by || new Types.ObjectId()

			const transactions = await this.createTransactions(
				transaction as ITransaction,
				installments,
				group_by.toString(),
				total,
				unity_id.toString(),
			)

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
