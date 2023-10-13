import { InappropriateUseCase } from 'App/Core/domain/errors/inappropriate-use-case'
import { UnityNotFoundError } from 'App/Core/domain/errors/unity-not-found'
import { TransactionsManagerInterface } from 'App/Core/domain/repositories/interface/transactions-manager-interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { left, right } from 'App/Core/shared'
import { ITransaction } from 'App/Types/ITransaction'
import { Mock, describe, expect, it, vi } from 'vitest'
import { TransactionWithoutProcedure } from '../helpers'
import { CreateOnlyOneTransactionUseCase } from './create-only-one-transaction-use-case'

const makeSut = () => {
	const manager: TransactionsManagerInterface = {
		create: vi.fn(),
	}
	const sut = new CreateOnlyOneTransactionUseCase(manager)
	const transaction = {
		unity_id: '1',
		amount: 100,
	} as TransactionWithoutProcedure

	return { sut, manager, transaction }
}

describe('Create only one transaction use case (Unit)', () => {
	it('should return an error if procedures are provided', async () => {
		const { sut, transaction } = makeSut()
		const result = await sut.execute({
			...transaction,
			procedures: [{ _id: 'id_valid' } as any],
		})

		expect(result).toEqual(left(new InappropriateUseCase()))
	})

	it('should return an error if unity_id is not provided', async () => {
		const { sut, transaction } = makeSut()

		const result = await sut.execute({
			...transaction,
			unity_id: undefined as unknown as string,
		})

		expect(result).toEqual(left(new UnityNotFoundError()))
	})

	it('should create a transaction if all data is valid', async () => {
		const { sut, manager, transaction } = makeSut()

		const createdTransaction = {
			_id: '1',
			unity_id: '1',
			value: 100,
		} as unknown as ITransaction

		const mock = manager.create as Mock

		mock.mockResolvedValueOnce(right(createdTransaction))

		const result = await sut.execute(transaction)

		expect(result).toEqual(right(createdTransaction))
		expect(manager.create).toHaveBeenCalledWith(transaction, '1')
	})

	it('should return an error if manager.create fails', async () => {
		const { sut, manager, transaction } = makeSut()

		const error = {
			message: 'Error creating transaction',
		} as AbstractError

		const mock = manager.create as Mock
		mock.mockResolvedValueOnce(left(error))

		const result = await sut.execute(transaction)

		expect(result).toEqual(left(error))
		expect(manager.create).toHaveBeenCalledWith(transaction, '1')
	})
})
