import { ProcedureTransactionEntity } from 'App/Core/domain/entities/transaction/ProcedureTransactionEntity'
import { TransactionEntity } from 'App/Core/domain/entities/transaction/TransactionEntity'
import { ProceduresManagerInterface } from 'App/Core/domain/repositories/interface'
import { PaymentProfManagerInterface } from 'App/Core/domain/repositories/interface/payment-prof-manager-interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IProcedureTransaction, ITransaction } from 'Types/ITransaction'
import { TransactionsManagerInterface } from '../../../repositories/interface/transactions-manager-interface'
import { TransactionWithProcedure } from '../helpers'

export class CreateWithProceduresTransactionUseCase
	implements UseCase<TransactionWithProcedure, ITransaction>
{
	constructor(
		private readonly manager: TransactionsManagerInterface,
		private readonly proceduresManager: ProceduresManagerInterface,
		private readonly paymentParticipationsManager: PaymentProfManagerInterface,
	) { }

	public async execute({
		procedures,
		...transaction
	}: TransactionWithProcedure): PromiseEither<AbstractError, ITransaction> {
		if (!procedures) return left(new AbstractError('Procedures not found', 400))

		const proceduresTransactions: IProcedureTransaction[] = await Promise.all(
			procedures.map(async (procedure) => {
				const procedureDocOrErr = await this.proceduresManager.findByProcedureId(
					procedure.value,
					transaction.unity_id.toString(),
				)

				if (procedureDocOrErr.isLeft())
					throw new AbstractError(procedureDocOrErr.extract().message, 400)

				const procedureDoc = procedureDocOrErr.extract()

				const paymentParticipationsOrErr =
					await this.paymentParticipationsManager.findCurrentPaymentParticipation(
						transaction.unity_id.toString(),
						transaction.prof.value,
						procedure.health_insurance.value,
						procedure.value,
					)

				if (paymentParticipationsOrErr.isLeft())
					throw new AbstractError(
						'Não foi possível encontrar a participação do procedimento, cadastre-a primeiro',
						400,
					)

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

				const procedureTransaction = procedureTransactionOrErr.extract()

				return procedureTransaction
			}),
		)

		const t = await TransactionEntity.build(transaction)

		if (t.isLeft()) return left(t.extract())

		let transactionDoc = t.extract()

		transactionDoc = transactionDoc.defineProcedures(proceduresTransactions)

		const docOrErr = await this.manager.create(
			transactionDoc.params(),
			transaction.unity_id.toString(),
		)

		if (docOrErr.isLeft()) return left(docOrErr.extract())

		const doc = docOrErr.extract()

		return right(doc)
	}
}
