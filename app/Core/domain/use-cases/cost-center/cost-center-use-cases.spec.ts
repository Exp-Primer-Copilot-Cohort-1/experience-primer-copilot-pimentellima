import { describe, expect, it, vi } from 'vitest'

import { left, right } from 'App/Core/shared'
import { ICostCenter } from 'App/Types/ICostCenter'
import { CostCenterManagerContract } from '../../repositories/cost-center/const-center-manager.interface'
import {
	CreateCostCenterUseCase,
	FindCostCenterByIdUseCase,
	UpdateCostCenterByIdUseCase
} from './index'


const costCenter: Partial<ICostCenter> = {
	name: 'Teste',
	active: true,

}


const manager: CostCenterManagerContract = {
	create: vi.fn(async (costCenter) => {
		return right(costCenter) as any
	}),
	findById: vi.fn(async (id) => {
		return right(id) as any
	}),
	update: vi.fn(async (_id, costCenter) => {
		return right(costCenter) as any
	}),

}

const makeSutCreate = () => {
	const sut = new CreateCostCenterUseCase(manager)
	return { sut, }
}


const makeSutFindById = () => {
	const sut = new FindCostCenterByIdUseCase(manager)
	return { sut, }
}

const makeSutUpdate = () => {
	const sut = new UpdateCostCenterByIdUseCase(manager)
	return { sut, }
}

describe('Use cases ref cost center (Only)', () => {
	describe('Create cost center Use Case', () => {
		it('should create category', async () => {
			const { sut } = makeSutCreate()
			const respOrErr = await sut.execute(costCenter)
			expect(respOrErr.isRight()).toBeTruthy()
		})

		it('should return error when create cost center', async () => {
			const { sut } = makeSutCreate()
			vi.spyOn(manager, 'create').mockImplementationOnce(async () => {
				return left(undefined) as any
			})
			const respOrErr = await sut.execute(costCenter)
			expect(respOrErr.isLeft()).toBeTruthy()
		})
	})

	describe('Find cost center by id Use Case', () => {

		it('should find cost center by id', async () => {
			const { sut } = makeSutFindById()
			const respOrErr = await sut.execute({ id: '123' })
			expect(respOrErr.isRight()).toBeTruthy()
		})

		it('should return error when find cost center by id', async () => {
			const { sut } = makeSutFindById()
			vi.spyOn(manager, 'findById').mockImplementationOnce(async () => {
				return left(undefined) as any
			})
			const respOrErr = await sut.execute({ id: 'id-invalid' })
			expect(respOrErr.isLeft()).toBeTruthy()
		})

		it('should return error when find by id cost center with id invalid', async () => {
			const { sut } = makeSutFindById()
			const respOrErr = await sut.execute({ id: null as any, ...costCenter })
			expect(respOrErr.isLeft()).toBeTruthy()
		})

	})

	describe('Update cost center Use Case', () => {

		it('should update cost center', async () => {
			const { sut } = makeSutUpdate()
			const respOrErr = await sut.execute({ id: '123', ...costCenter })
			expect(respOrErr.isRight()).toBeTruthy()
		})

		it('should return error when update cost center', async () => {
			const { sut } = makeSutUpdate()
			vi.spyOn(manager, 'update').mockImplementationOnce(async () => {
				return left(undefined) as any
			})
			const respOrErr = await sut.execute({ id: 'id-invalid', ...costCenter })
			expect(respOrErr.isLeft()).toBeTruthy()
		})

		it('should return error when update cost center with id invalid', async () => {
			const { sut } = makeSutUpdate()
			const respOrErr = await sut.execute({ id: null as any, ...costCenter })
			expect(respOrErr.isLeft()).toBeTruthy()
		})
	})

})
