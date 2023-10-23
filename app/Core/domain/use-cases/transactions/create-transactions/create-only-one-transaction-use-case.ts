import { InappropriateUseCase } from 'App/Core/domain/errors/inappropriate-use-case'
import { TransactionsMongooseRepository } from 'App/Core/domain/repositories'
import { TransactionsManagerContract } from 'App/Core/domain/repositories/interface/transactions-manager-interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { ITransaction } from 'App/Types/ITransaction'
import { inject, injectable, registry } from 'tsyringe'
import { UnityNotFoundError } from '../../../errors/unity-not-found'
import { TransactionWithoutProcedure } from '../helpers'

/**
 * Use case responsible for creating only one transaction without procedures.
 * @implements {UseCase}
 */
@injectable()
@registry([{ token: CreateOnlyOneTransactionUseCase, useClass: CreateOnlyOneTransactionUseCase }])
export class CreateOnlyOneTransactionUseCase
	implements UseCase<TransactionWithoutProcedure, ITransaction>
{
	/**
	 * Creates an instance of CreateOnlyOneTransactionUseCase.
	 * @param {TransactionsManagerContract} manager - The manager for transactions.
	 */
	constructor(
		@inject(TransactionsMongooseRepository) private readonly manager: TransactionsManagerContract
	) { } // eslint-disable-line

	/**
	 * Executes the use case.
	 * @param {TransactionWithoutProcedure} param - The transaction data.
	 * @returns {PromiseEither<AbstractError, ITransaction>} Either an error or the created transaction.
	 */
	public async execute({
		procedures = [],
		...transaction
	}: TransactionWithoutProcedure): PromiseEither<AbstractError, ITransaction> {
		if (procedures && procedures?.length > 0) return left(new InappropriateUseCase())
		if (!transaction.unity_id) return left(new UnityNotFoundError())

		const docOrErr = await this.manager.create(
			transaction,
			transaction.unity_id.toString(),
		)

		return docOrErr
	}
}
