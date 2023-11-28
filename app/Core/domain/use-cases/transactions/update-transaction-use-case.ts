import { TransactionsMongooseRepository } from 'App/Core/domain/repositories'
import { TransactionsManagerContract } from 'App/Core/domain/repositories/interface/transactions-manager-interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { ITransaction } from 'App/Types/ITransaction'
import { inject, injectable, registry } from 'tsyringe'
import { IdNotProvidedError } from '../../errors'

type In = ITransaction & { id: string }

/**
 * Use case responsible for creating only one transaction without procedures.
 * @implements {UseCase}
 */
@injectable()
@registry([{ token: UpdateTransactionUseCase, useClass: UpdateTransactionUseCase }])
export class UpdateTransactionUseCase
	implements UseCase<In, Count>
{
	/**
	 * Creates an instance of UpdateTransactionUseCase.
	 * @param {TransactionsManagerContract} manager - The manager for transactions.
	 */
	constructor(
		@inject(TransactionsMongooseRepository) private readonly manager: TransactionsManagerContract
	) { } // eslint-disable-line

	/**
	 * Executes the use case.
	 * @param {TransactionWithoutProcedure} param - The transaction data.
	 * @returns {PromiseEither<AbstractError, Count>} Either an error or the created transaction.
	 */
	public async execute({
		id,
		...transaction
	}: In): PromiseEither<AbstractError, Count> {
		if (!id) return left(new IdNotProvidedError())

		return this.manager.update(id, transaction)
	}
}
