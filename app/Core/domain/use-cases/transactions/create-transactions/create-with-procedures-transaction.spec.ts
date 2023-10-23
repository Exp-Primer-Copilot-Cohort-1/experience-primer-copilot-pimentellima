import { ProcedureTransactionEntity } from 'App/Core/domain/entities/transaction/ProcedureTransactionEntity'
import { TransactionEntity } from 'App/Core/domain/entities/transaction/TransactionEntity'
import { ParticipationPaymentsNotFoundError } from 'App/Core/domain/errors/participation-payments-not-found'
import { ProcedureNotFoundError } from 'App/Core/domain/errors/procedure-not-found'
import { ProceduresManagerContract } from 'App/Core/domain/repositories/interface'
import { PaymentProfManagerContract } from 'App/Core/domain/repositories/interface/payment-prof-manager-interface'
import { TransactionsManagerContract } from 'App/Core/domain/repositories/interface/transactions-manager-interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { left, right } from 'App/Core/shared'
import { TransactionWithProcedure } from '../helpers'
import { CreateWithProceduresTransactionUseCase } from './create-with-procedures-transaction'

import { Mock, SpyInstance, describe, expect, it, vi } from 'vitest'

const mountTransaction = () => ({
	_id: 'transaction1',
	unity_id: 'unity1',
	prof: 'prof1',
	procedures: [],
	defineProcedures: vi.fn(() => mountTransaction()),
})

const makeMocks = () => {
	const proceduresManager = {
		findById: vi.fn(),
	} as unknown as ProceduresManagerContract

	const participationManager = {
		findCurrentPaymentParticipation: vi.fn(),
	} as unknown as PaymentProfManagerContract

	const mockProceduresManager = proceduresManager.findById as Mock
	const mockParticipationsManager =
		participationManager.findCurrentPaymentParticipation as Mock

	mockProceduresManager.mockImplementation((a) =>
		right({
			...a,
			_id: 'procedure1',
			products: [],
		}),
	)
	mockParticipationsManager.mockImplementation((a) =>
		right({
			...a,
			_id: 'paymentParticipation1',
			percent: 10,
			abs: 100,
		}),
	)

	const spyEntityTransaction: SpyInstance = vi
		.spyOn(TransactionEntity, 'build')
		.mockImplementation(async (a) => right(mountTransaction()))

	const spyEntityProcedure: SpyInstance = vi
		.spyOn(ProcedureTransactionEntity, 'build')
		.mockImplementation(async (a) => right({ ...a } as any))

	return {
		proceduresManager,
		participationManager,
		mockProceduresManager,
		mockParticipationsManager,
		spyEntityTransaction,
		spyEntityProcedure,
	}
}

const makeSut = () => {
	const manager: TransactionsManagerContract = {
		create: vi.fn(),
	}
	const {
		mockParticipationsManager,
		mockProceduresManager,
		participationManager,
		proceduresManager,
		spyEntityProcedure,
		spyEntityTransaction,
	} = makeMocks()

	const sut = new CreateWithProceduresTransactionUseCase(
		manager,
		proceduresManager,
		participationManager,
	)

	const procedures: any[] = [
		{
			_id: 'procedure1',
			health_insurance: 'health_insurance1',
		},
		{
			_id: 'procedure2',
			health_insurance: 'health_insurance2',
		},
	]
	const transaction: TransactionWithProcedure = {
		unity_id: 'unity1',
		prof: 'prof1',
		procedures,
	} as TransactionWithProcedure

	return {
		sut,
		manager,
		transaction,
		procedures,
		proceduresManager,
		participationManager,
		mockProceduresManager,
		mockParticipationsManager,
		spyEntityProcedure,
		spyEntityTransaction,
	}
}

describe('Create with procedures transaction use case (Unit)', () => {
	it('should throw ProcedureNotFoundError if no procedures are provided', async () => {
		const { sut } = makeSut()
		const result = await sut.execute({
			unity_id: 'unity1',
			prof: 'prof1',
			procedures: [],
		} as unknown as TransactionWithProcedure)

		expect(result.isLeft()).toBe(true)
		expect(result.extract()).toBeInstanceOf(ProcedureNotFoundError)
	})

	it('should throw ParticipationPaymentsNotFoundError if payment participations are not found', async () => {
		const { sut, transaction, mockParticipationsManager } = makeSut()

		mockParticipationsManager.mockReturnValueOnce(left(new Error()))

		expect(() => sut.execute(transaction)).rejects.toThrow(
			new ParticipationPaymentsNotFoundError(),
		)
	})

	it('should throw an error if there is an error building the procedure transaction entity', async () => {
		const { sut, transaction, spyEntityProcedure } = makeSut()

		spyEntityProcedure.mockImplementationOnce(() =>
			left(new AbstractError('Error building procedure transaction entity', 400)),
		)

		expect(() => sut.execute(transaction)).rejects.toThrow(
			new AbstractError('Error building procedure transaction entity', 400),
		)
	})

	it('should throw an error if there is an error building the transaction entity', async () => {
		const { sut, transaction, spyEntityTransaction, spyEntityProcedure } = makeSut()
		spyEntityProcedure.mockImplementationOnce(() =>
			right({
				_id: 'procedureTransaction1',
				procedure_id: 'procedure1',
				stock: [],
				payment_participation: {
					value: 'paymentParticipation1',
					percent: 10,
					price: 100,
				},
			}),
		)
		spyEntityTransaction.mockImplementationOnce(() =>
			left(new AbstractError('Error building transaction entity', 401)),
		)

		expect(() => sut.execute(transaction)).rejects.toThrow(
			new AbstractError('Error building transaction entity', 400),
		)
	})

	it('should throw an error if there is an error creating the transaction document ', async () => {
		const { sut, transaction, manager, spyEntityProcedure, spyEntityTransaction } =
			makeSut()

		spyEntityTransaction.mockImplementationOnce(() => right(mountTransaction()))

		const mockManager = manager.create as Mock

		mockManager.mockImplementationOnce(() =>
			left(new AbstractError('Error creating transaction document', 401)),
		)

		expect(() => sut.execute(transaction)).rejects.toThrow(
			new AbstractError('Error creating transaction document', 400),
		)
	})
})
