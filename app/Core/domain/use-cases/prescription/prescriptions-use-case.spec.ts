import { PrescriptionManagerContract } from 'App/Core/domain/repositories/interface'
import { left, right } from 'App/Core/shared'
import { IPrescription } from 'App/Types/IPrescription'
import { describe, expect, it, vi } from 'vitest'
import {
	CreatePrescriptionUseCase,
	FindPrescriptionsByIdUseCase,
	UpdatePrescriptionsByIdUseCase,
	UpdateStatusPrescriptionsByIdUseCase
} from './index'



const prescription: IPrescription = {
	name: 'Teste',
	_id: '123',
	prof: {
		label: 'Teste',
		value: '6359962cc109b232759921e1'
	},
	text: 'prescription',
	active: true,
	unity_id: '123',
	created_at: new Date(),
	updated_at: new Date(),
}
const updateData = {
	name: 'test update',
	prof: {
		label: 'Teste',
		value: '6359962cc109b232759921e1'
	},
	text: 'prescription update',
}


const manager: PrescriptionManagerContract = {
	create: vi.fn(async (prescription) => {
		return right(prescription as IPrescription) as any
	}),
	update: vi.fn(async (_id, prescription) => {
		return right(prescription) as any
	}),
	findById: vi.fn(async (_id) => {
		return right(_id) as any
	}),
	findAll: vi.fn(async (unity_id) => {
		return right(unity_id) as any
	}),
	updateStatus: vi.fn(async (_id, status) => {
		return right(status) as any
	})
}

const makeSutCreate = () => {
	const sut = new CreatePrescriptionUseCase(manager)
	return { sut, }
}

const makeSutFindById = () => {
	const sut = new FindPrescriptionsByIdUseCase(manager)
	return { sut, }
}

const makeSutUpdate = () => {
	const sut = new UpdatePrescriptionsByIdUseCase(manager)
	return { sut, }
}

const makeSutUpdateStatus = () => {
	const sut = new UpdateStatusPrescriptionsByIdUseCase(manager)
	return { sut, }
}

describe('Use cases ref prescriptions (Unit)', () => {

	describe('Create prescription Use Case', () => {

		it('should create prescription', async () => {
			const { sut } = makeSutCreate()
			const respOrErr = await sut.execute(prescription)
			expect(respOrErr.isRight()).toBeTruthy()
		})

		it('should return error when create prescription', async () => {
			const { sut } = makeSutCreate()
			vi.spyOn(manager, 'create').mockImplementationOnce(async () => {
				return left(undefined) as any
			})
			const respOrErr = await sut.execute(prescription)
			expect(respOrErr.isLeft()).toBeTruthy()
		})
	})

	describe('Find prescriptions by id Use Case', () => {
		it('should find prescriptions by id', async () => {
			const { sut } = makeSutFindById()
			const respOrErr = await sut.execute({ id: '123' })
			expect(respOrErr.isRight()).toBeTruthy()
		})

		it('should return error when find prescriptions by id', async () => {
			const { sut } = makeSutFindById()
			vi.spyOn(manager, 'findById').mockImplementationOnce(async () => {
				return left(undefined) as any
			})
			const respOrErr = await sut.execute({ id: 'id-invalid' })
			expect(respOrErr.isLeft()).toBeTruthy()
		})

		it('should return error when find by id prescriptions with id invalid', async () => {
			const { sut } = makeSutFindById()
			const respOrErr = await sut.execute({ id: null as any, ...prescription })
			expect(respOrErr.isLeft()).toBeTruthy()
		})

	})

	describe('Update prescriptions by id Use Case', () => {

		it('should update prescription', async () => {
			const { sut } = makeSutUpdate()
			const respOrErr = await sut.execute({ id: '123', ...updateData })
			expect(respOrErr.isRight()).toBeTruthy()
		})

		it('should return error when update prescription', async () => {
			const { sut } = makeSutUpdate()
			vi.spyOn(manager, 'update').mockImplementationOnce(async () => {
				return left(undefined) as any
			})
			const respOrErr = await sut.execute({ id: 'id-invalid', ...prescription })
			expect(respOrErr.isLeft()).toBeTruthy()
		})

		it('should return error when update prescription with id invalid', async () => {
			const { sut } = makeSutUpdate()
			const respOrErr = await sut.execute({ id: null as any, ...updateData })
			expect(respOrErr.isLeft()).toBeTruthy()
		})
	})

	describe('Update Status prescriptions by id Use Case', () => {

		it('should update status prescription', async () => {
			const { sut } = makeSutUpdateStatus()
			const respOrErr = await sut.execute({ id: '123', status: true })
			expect(respOrErr.isRight()).toBeTruthy()
		})

		it('should return error when update status prescription with id invalid', async () => {
			const { sut } = makeSutUpdateStatus()
			const respOrErr = await sut.execute({ id: null as any, status: true })
			expect(respOrErr.isLeft()).toBeTruthy()
		})
	})

})