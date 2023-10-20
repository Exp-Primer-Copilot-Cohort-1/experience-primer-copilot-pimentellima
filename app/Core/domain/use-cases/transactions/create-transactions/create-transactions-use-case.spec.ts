/* eslint-disable @typescript-eslint/no-explicit-any */
import { TransactionEntity } from 'App/Core/domain/entities/transaction/TransactionEntity'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { left, right } from 'App/Core/shared'
import { ITransaction } from 'App/Types/ITransaction'
import { Mock, SpyInstance, describe, expect, it, vi } from 'vitest'
import { UnityNotFoundError } from '../../../errors/unity-not-found'
import { TransactionWithoutProcedure } from '../helpers'
import { CreateTransactionUseCase } from './create-transactions-use-case'

const makeSut = () => {
	const withoutProcedureMock: UseCase<TransactionWithoutProcedure, ITransaction> = {
		execute: vi.fn().mockImplementation(async (a) => right({ ...a } as any)),
	}
	const withProceduresMock: UseCase<ITransaction, ITransaction> = {
		execute: vi.fn().mockImplementation(async (a) => right({ ...a } as any)),
	}
	const withActivityMock: UseCase<ITransaction, ITransaction> = {
		execute: vi.fn().mockImplementation(async (a) => right({ ...a } as any)),
	}
	const sessionMock = {
		startSession: vi.fn(),
		commitTransaction: vi.fn(),
		abortTransaction: vi.fn(),
		endSession: vi.fn(),
	}
	const spyEntity: SpyInstance = vi
		.spyOn(TransactionEntity, 'build')
		.mockImplementation(async (a) => right({ ...a } as any))
	const sut: CreateTransactionUseCase = new CreateTransactionUseCase(
		withoutProcedureMock as any,
		withProceduresMock as any,
		withActivityMock as any,
		sessionMock as any,
	)

	const spySut = vi.spyOn(
		CreateTransactionUseCase.prototype as any,
		'createTransactions',
	)

	return {
		sut,
		withoutProcedureMock,
		withProceduresMock,
		withActivityMock,
		sessionMock,
		spyEntity,
		spySut,
	}
}

const mountTransaction = (transaction?: Partial<ITransaction>): ITransaction => ({
	unity_id: 'unity_id',
	installments: 1,
	procedures: [],
	amount: 100,
	date: new Date(),
	type: 'income',
	paymentForm: 'cash',
	account: 'account',
	cost_center: 'cost_center',
	financial_category: 'financial_category',
	installment: false,
	installmentCurrent: 1,
	paid: true,
	active: true,
	...transaction,
})

describe('Create Transaction Use Case (Unit)', () => {
	it('should return an error if unity_id is not provided', async () => {
		const { sut } = makeSut()
		const transaction: TransactionWithoutProcedure = mountTransaction({
			unity_id: undefined,
		})

		const result = await sut.execute(transaction)

		expect(result).toEqual(left(new UnityNotFoundError()))
	})

	it('should call startSession on the session object', async () => {
		const transaction: TransactionWithoutProcedure = mountTransaction()
		const { sut, sessionMock } = makeSut()

		await sut.execute(transaction)

		expect(sessionMock.startSession).toHaveBeenCalled()
	})

	it('should call withProceduresMock if procedures are provided', async () => {
		const transaction = mountTransaction({
			procedures: [{ _id: 'procedure_id', price: 100 } as any],
		})
		const { sut, withProceduresMock } = makeSut()

		await sut.execute(transaction)

		expect(withProceduresMock.execute).toHaveBeenCalled()
	})

	it('should call withActivityMock if activity_id is provided', async () => {
		const activity = { activity_id: 'activity_id' }
		const transaction: TransactionWithoutProcedure = mountTransaction({
			activity_id: activity.activity_id,
		})
		const { sut, withActivityMock } = makeSut()

		const spyActivityMock = vi.spyOn(withActivityMock, 'execute')

		await sut.execute(transaction)

		expect(withActivityMock.execute).toHaveBeenCalled()
		expect(spyActivityMock).toHaveBeenCalledWith(
			expect.objectContaining({ activity_id: activity.activity_id }),
		)
	})

	it('should call commitTransaction on the session object if everything succeeds', async () => {
		const transaction: TransactionWithoutProcedure = mountTransaction()
		const { sut, sessionMock } = makeSut()

		await sut.execute(transaction)

		expect(sessionMock.commitTransaction).toHaveBeenCalled()
	})

	it('should call abortTransaction on the session object if something fails', async () => {
		const transaction: TransactionWithoutProcedure = mountTransaction()
		const { sut, sessionMock, spyEntity } = makeSut()

		spyEntity.mockImplementationOnce(async () =>
			left(new Error('Something went wrong')),
		)
		await sut.execute(transaction)

		expect(sessionMock.abortTransaction).toHaveBeenCalled()
	})

	it('should call error if something fails providing procedures and activity_id', async () => {
		const transaction: TransactionWithoutProcedure = mountTransaction({
			procedures: [{ _id: 'procedure_id', price: 100 } as any],
			activity_id: 'activity_id_valid',
		})
		const { sut, withActivityMock, sessionMock } = makeSut()

		const mock = withActivityMock.execute as Mock

		mock.mockImplementationOnce(async () => left(new Error('Something went wrong')))
		const result = await sut.execute(transaction)

		expect(sessionMock.abortTransaction).toHaveBeenCalled()
		expect(mock).toHaveBeenCalled()
		expect(result.isLeft()).toBeTruthy()
	})

	it('should call without procedure use case', async () => {
		const transaction: TransactionWithoutProcedure = mountTransaction({
			procedures: [{ _id: 'procedure_id', price: 100 } as any],
			activity_id: 'activity_id_valid',
		})
		const { sut, withoutProcedureMock, sessionMock, withProceduresMock } = makeSut()

		const mockWithProcedure = withProceduresMock.execute as Mock

		mockWithProcedure.mockImplementationOnce(async () =>
			left(new Error('Something went wrong')),
		)

		const result = await sut.execute(transaction)

		expect(sessionMock.commitTransaction).toHaveBeenCalled()
		expect(withoutProcedureMock.execute).toHaveBeenCalled()
		expect(result.isRight()).toBeTruthy()
	})

	it('should call withProceduresMock multiple times if installments is greater than 1', async () => {
		const installments = 12
		const transaction: TransactionWithoutProcedure = mountTransaction({
			procedures: [{ _id: 'procedure_id', price: 100 } as any],
			activity_id: 'activity_id_valid',
			installments,
		})
		const { sut, withProceduresMock, spySut } = makeSut()

		await sut.execute(transaction)

		expect(withProceduresMock.execute).toHaveBeenCalledTimes(installments)
		expect(spySut).toHaveBeenCalledTimes(1)

		expect(spySut).toHaveReturnedWith(
			expect.arrayContaining(
				Array(installments).map((_, index) =>
					expect.objectContaining({ installmentCurrent: index + 1 }),
				),
			),
		)
		expect(spySut).not.toHaveReturnedWith(
			expect.arrayContaining([
				expect.objectContaining({ installmentCurrent: installments + 1 }),
			]),
		)
	})
})
