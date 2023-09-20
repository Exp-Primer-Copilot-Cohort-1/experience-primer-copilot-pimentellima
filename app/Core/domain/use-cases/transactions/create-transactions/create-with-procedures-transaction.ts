import { ProcedureTransactionEntity } from 'App/Core/domain/entities/transaction/ProcedureTransactionEntity'
import { TransactionEntity } from 'App/Core/domain/entities/transaction/TransactionEntity'
import { ParticipationPaymentsNotFoundError } from 'App/Core/domain/errors/participation-payments-not-found'
import { ProcedureNotFoundError } from 'App/Core/domain/errors/procedure-not-found'
import { ProceduresManagerInterface } from 'App/Core/domain/repositories/interface'
import { PaymentProfManagerInterface } from 'App/Core/domain/repositories/interface/payment-prof-manager-interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { IProcedureTransaction, ITransaction } from 'App/Types/ITransaction'
import { TransactionsManagerInterface } from '../../../repositories/interface/transactions-manager-interface'
import { TransactionWithProcedure } from '../helpers'

export class CreateWithProceduresTransactionUseCase
	implements UseCase<TransactionWithProcedure, ITransaction>
{
	constructor(
		private readonly manager: TransactionsManagerInterface,
		private readonly proceduresManager: ProceduresManagerInterface,
		private readonly paymentParticipationsManager: PaymentProfManagerInterface,
	) { } // eslint-disable-line

	public async execute({
		procedures,
		...transaction
	}: TransactionWithProcedure): PromiseEither<AbstractError, ITransaction> {
		if (!procedures?.length) return left(new ProcedureNotFoundError())

		const proceduresTransactions: IProcedureTransaction[] = await Promise.all(
			procedures.map(async (procedure) => {
				const procedureDocOrErr = await this.proceduresManager.findByProcedureId(
					procedure._id as string,
				)

				if (procedureDocOrErr.isLeft()) throw procedureDocOrErr

				const procedureDoc = procedureDocOrErr.extract()

				const paymentParticipationsOrErr =
					await this.paymentParticipationsManager.findCurrentPaymentParticipation(
						transaction.unity_id.toString(),
						transaction.prof as string,
						procedure.health_insurance as string,
						procedure._id?.toString() as string,
					)

				if (paymentParticipationsOrErr.isLeft())
					throw new ParticipationPaymentsNotFoundError()

				const paymentParticipations = paymentParticipationsOrErr.extract()

				const procedureTransactionOrErr = await ProcedureTransactionEntity.build({
					...procedure,
					stock: procedureDoc.products || [],
					payment_participation: {
						value: paymentParticipations._id?.toString() as string,
						percent: paymentParticipations.percent,
						price: Number(paymentParticipations.abs),
					},
				})

				if (procedureTransactionOrErr.isLeft())
					throw new AbstractError(
						procedureTransactionOrErr.extract().message,
						400,
					)

				return procedureTransactionOrErr.extract()
			}),
		)

		const t = await TransactionEntity.build(transaction)

		if (t.isLeft()) throw t.extract()

		const transactionDoc = t.extract().defineProcedures(proceduresTransactions)

		const docOrErr = await this.manager.create(
			transactionDoc,
			transactionDoc.unity_id.toString(),
		)

		if (docOrErr.isLeft()) throw docOrErr.extract()

		return docOrErr
	}
}
