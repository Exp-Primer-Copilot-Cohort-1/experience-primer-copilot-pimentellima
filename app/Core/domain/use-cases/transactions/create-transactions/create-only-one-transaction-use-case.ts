import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { ITransaction } from 'Types/ITransaction'
import { UnitNotFoundError } from '../../../errors/unit-not-found'
import { TransactionsManagerInterface } from '../../../repositories/interface/transactions-manager-interface'
import { TransactionWithoutProcedure } from '../helpers'

export class CreateOnlyOneTransactionUseCase
	implements UseCase<TransactionWithoutProcedure, ITransaction>
{
	constructor(private readonly manager: TransactionsManagerInterface) { }

	public async execute(
		transaction: TransactionWithoutProcedure,
	): PromiseEither<AbstractError, ITransaction> {
		if (!transaction.unity_id) return left(new UnitNotFoundError())

		const docOrErr = await this.manager.create(
			transaction,
			transaction.unity_id.toString(),
		)

		if (docOrErr.isLeft()) return left(docOrErr.extract())

		const doc = docOrErr.extract()

		return right(doc as ITransaction)
	}
}
