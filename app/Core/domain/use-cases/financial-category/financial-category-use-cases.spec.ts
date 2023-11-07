import { describe, expect, it, vi } from 'vitest'

import { left, right } from 'App/Core/shared'
import { FinancialCategoryType, IFinancialCategory } from 'App/Types/IFinancialCategory'
import { FinancialCategoryManagerContract } from '../../repositories/interface/financial-category-manager.interface'
import {
	CreateFinancialCategoryUseCase,
	FindAllFinancialCategoryByUnityUseCase,
	FindFinancialCategoryByIdUseCase,
	UpdateFinancialCategoryByIdUseCase
} from './index'


const financialCategory: IFinancialCategory = {
	name: 'Teste',
	type: FinancialCategoryType.Expense,
	active: true,
	unity_id: '5f9d5b2b7d5d9c0017b8a4f1',
}
const dataUpdate: IFinancialCategory = {
	name: 'Teste Update',
	type: FinancialCategoryType.Revenue,
	active: true,
	unity_id: '5f9d5b2b7d5d9c0017b8a4f1',
}

const manager: FinancialCategoryManagerContract = {
	create: vi.fn(async (financialCategory) => {
		return right(financialCategory) as any
	}),
	findAll: vi.fn(async () => {
		return right([]) as any
	}),
	findById: vi.fn(async (id) => {
		return right(id) as any
	}),
	update: vi.fn(async (_id, financialCategory) => {
		return right(financialCategory) as any
	}),

}

const makeSutCreate = () => {
	const sut = new CreateFinancialCategoryUseCase(manager)
	return { sut, }
}

const makeSutFindAll = () => {
	const sut = new FindAllFinancialCategoryByUnityUseCase(manager)
	return { sut, }
}

const makeSutFindById = () => {
	const sut = new FindFinancialCategoryByIdUseCase(manager)
	return { sut, }
}

const makeSutUpdate = () => {
	const sut = new UpdateFinancialCategoryByIdUseCase(manager)
	return { sut, }
}

describe('Use cases ref categories (Only)', () => {
	describe('Create financial category Use Case', () => {
		it('should create category', async () => {
			const { sut } = makeSutCreate()
			const respOrErr = await sut.execute(financialCategory)
			expect(respOrErr.isRight()).toBeTruthy()
		})

		it('should return error when create financial category', async () => {
			const { sut } = makeSutCreate()
			vi.spyOn(manager, 'create').mockImplementationOnce(async () => {
				return left(undefined) as any
			})
			const respOrErr = await sut.execute(financialCategory)
			expect(respOrErr.isLeft()).toBeTruthy()
		})
	})

	describe('Find all accounts Use Case', () => {
		it('should find all financial category', async () => {
			const { sut } = makeSutFindAll()
			const respOrErr = await sut.execute({ unity_id: 'unity_id' })
			expect(respOrErr.isRight()).toBeTruthy()
		})

		it('should return error when find all financial category', async () => {
			const { sut } = makeSutFindAll()

			vi.spyOn(manager, 'findAll').mockImplementationOnce(async () => {
				return left(undefined) as any
			})

			const respOrErr = await sut.execute({ unity_id: 'unity-invalid' })

			expect(respOrErr.isLeft()).toBeTruthy()
		})
	})

	describe('Find financial category by id Use Case', () => {

		it('should find financial category by id', async () => {
			const { sut } = makeSutFindById()
			const respOrErr = await sut.execute({ id: '123' })
			expect(respOrErr.isRight()).toBeTruthy()
		})

		it('should return error when find financial category by id', async () => {
			const { sut } = makeSutFindById()
			vi.spyOn(manager, 'findById').mockImplementationOnce(async () => {
				return left(undefined) as any
			})
			const respOrErr = await sut.execute({ id: 'id-invalid' })
			expect(respOrErr.isLeft()).toBeTruthy()
		})

		it('should return error when find by id financial category with id invalid', async () => {
			const { sut } = makeSutFindById()
			const respOrErr = await sut.execute({ id: null as any, ...financialCategory })
			expect(respOrErr.isLeft()).toBeTruthy()
		})

	})

	describe('Update financial category Use Case', () => {

		it('should update financial financial category', async () => {
			const { sut } = makeSutUpdate()
			const respOrErr = await sut.execute({ id: '123', ...dataUpdate })
			expect(respOrErr.isRight()).toBeTruthy()
		})

		it('should return error when update financial category', async () => {
			const { sut } = makeSutUpdate()
			vi.spyOn(manager, 'update').mockImplementationOnce(async () => {
				return left(undefined) as any
			})
			const respOrErr = await sut.execute({ id: 'id-invalid', ...dataUpdate })
			expect(respOrErr.isLeft()).toBeTruthy()
		})

		it('should return error when update financial category with id invalid', async () => {
			const { sut } = makeSutUpdate()
			const respOrErr = await sut.execute({ id: null as any, ...dataUpdate })
			expect(respOrErr.isLeft()).toBeTruthy()
		})
	})

})
