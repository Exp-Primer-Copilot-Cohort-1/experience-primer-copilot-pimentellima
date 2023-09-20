import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { ITransaction } from 'App/Types/ITransaction'
import { UnitNotFoundError } from '../../../errors/unit-not-found'
import { TransactionsManagerInterface } from '../../../repositories/interface/transactions-manager-interface'
import { TransactionWithoutProcedure } from '../helpers'

export class CreateOnlyOneTransactionUseCase
	implements UseCase<TransactionWithoutProcedure, ITransaction>
{
	constructor(private readonly manager: TransactionsManagerInterface) { } // eslint-disable-line

	public async execute({
		procedures = [],
		...transaction
	}: TransactionWithoutProcedure): PromiseEither<AbstractError, ITransaction> {
		if (procedures && procedures?.length > 0)
			return left(new AbstractError('Existem procedimentos na transação', 400))
		if (!transaction.unity_id) return left(new UnitNotFoundError())

		const docOrErr = await this.manager.create(
			transaction,
			transaction.unity_id.toString(),
		)

		return docOrErr
	}
}
