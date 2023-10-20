import { describe, expect, it, vi } from 'vitest'

import { ProceduresManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { left, right } from 'App/Core/shared'
import { IProcedure } from 'App/Types/IProcedure'
import {
	CreateProceduresUseCase,
	DeleteProceduresByIdUseCase,

	FindAllProceduresByUnityUseCase,

	UpdateProceduresByIdUseCase
} from './index'


const procedure: IProcedure = {
	_id: '123',
	name: 'CONSULT',
	active: true,
	color: '#FF0000',
	minutes: 30,
	health_insurances: [{
		_id: '63597974c109b232759921dc',
		price: 260.00,
	}],
	profs: [{
		value: '63528c11c109b232759921d1',
		label: 'CONSULT',
	}],
	unity_id: '63528c11c109b232759921d1',
	created_at: new Date(),
	updated_at: new Date()
}


const ProcedureManager: ProceduresManagerInterface = {
	create: vi.fn(async (procedure) => {
		return right(procedure) as any
	}),
	findAll: vi.fn(async () => {
		return right([]) as any
	}),
	delete: vi.fn(async (id) => {
		return right(id) as any
	}),
	findById: vi.fn(async (id) => {
		return right(id) as any
	}),
	update: vi.fn(async (_id, procedure) => {
		return right(procedure) as any
	}),
	findByName: vi.fn(async (name, unity_id) => {
		return right([]) as any
	})
}

const makeSutCreate = () => {
	const sut = new CreateProceduresUseCase(ProcedureManager)
	return { sut, }
}

const makeSutFindAll = () => {
	const sut = new FindAllProceduresByUnityUseCase(ProcedureManager)
	return { sut, }
}

const makeSutDelete = () => {
	const sut = new DeleteProceduresByIdUseCase(ProcedureManager)
	return { sut, }
}

const makeSutUpdate = () => {
	const sut = new UpdateProceduresByIdUseCase(ProcedureManager)
	return { sut, }
}

describe('Use cases ref procedures (Unit)', () => {
	describe('Create procedure Use Case', () => {
		it('should create procedure', async () => {
			const { sut } = makeSutCreate()
			const respOrErr = await sut.execute(procedure)
			expect(respOrErr.isRight()).toBeTruthy()
		})

		it('should return error when create procedure', async () => {
			const { sut } = makeSutCreate()
			vi.spyOn(ProcedureManager, 'create').mockImplementationOnce(async () => {
				return left(undefined) as any
			})
			const respOrErr = await sut.execute(procedure)
			expect(respOrErr.isLeft()).toBeTruthy()
		})
	})

	describe('Find all procedures Use Case', () => {

		it('should find all procedures', async () => {
			const { sut } = makeSutFindAll()
			const respOrErr = await sut.execute({ unity_id: 'unity_id' })
			expect(respOrErr.isRight()).toBeTruthy()
		})

		it('should return error when find all procedures', async () => {
			const { sut } = makeSutFindAll()

			vi.spyOn(ProcedureManager, 'findAll').mockImplementationOnce(async () => {
				return left(undefined) as any
			})

			const respOrErr = await sut.execute({ unity_id: 'unity-invalid' })

			expect(respOrErr.isLeft()).toBeTruthy()
		})


		it('should return error when find all procedures with unity_id invalid', async () => {
			const { sut } = makeSutFindAll()

			const respOrErr = await sut.execute({ unity_id: null as any })

			expect(respOrErr.isLeft()).toBeTruthy()
			expect(respOrErr.extract()).toBeInstanceOf(AbstractError)
		})
	})

	describe('Delete procedure Use Case', () => {

		it('should delete procedure by id', async () => {
			const { sut } = makeSutDelete()
			const respOrErr = await sut.execute({ id: '123' })
			expect(respOrErr.isRight()).toBeTruthy()
		})

		it('should return error when delete procedure by id', async () => {
			const { sut } = makeSutDelete()
			vi.spyOn(ProcedureManager, 'delete').mockImplementationOnce(async () => {
				return left(undefined) as any
			})
			const respOrErr = await sut.execute({ id: 'id-invalid' })
			expect(respOrErr.isLeft()).toBeTruthy()
		})

		it('should return error when delete procedure with id invalid', async () => {
			const { sut } = makeSutDelete()
			const respOrErr = await sut.execute({ id: null as any })
			expect(respOrErr.isLeft()).toBeTruthy()
		})
	})



	describe('Update procedure Use Case', () => {

		it('should update procedure', async () => {
			const { sut } = makeSutUpdate()
			const respOrErr = await sut.execute({ ...procedure })
			expect(respOrErr.isRight()).toBeTruthy()
		})

		it('should return error when update procedure', async () => {
			const { sut } = makeSutUpdate()
			vi.spyOn(ProcedureManager, 'update').mockImplementationOnce(async () => {
				return left(undefined) as any
			})
			const respOrErr = await sut.execute({ ...procedure, _id: 'id-invalid' })
			expect(respOrErr.isLeft()).toBeTruthy()
		})

		it('should return error when update procedure with id invalid', async () => {
			const { sut } = makeSutUpdate()
			const respOrErr = await sut.execute({ ...procedure, _id: null as any })
			expect(respOrErr.isLeft()).toBeTruthy()
		})
	})





})
