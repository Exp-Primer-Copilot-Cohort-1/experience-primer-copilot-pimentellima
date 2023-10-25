import { describe, expect, it, vi } from 'vitest'

import { CategoriesManagerContract } from 'App/Core/domain/repositories/interface'
import { left, right } from 'App/Core/shared'
import { ICategory } from 'App/Types/ICategory'
import {
	CreateCategoriesUseCase,
	DeleteCategoriesByIdUseCase,
	FindAllCategoriesUseCase,
	ShowCategoriesByIdUseCase,
	UpdateCategoriesByIdUseCase
} from './index'


const category: ICategory = {
	name: 'CONSULT',
	prof: {
		value: 'CONSULT',
		label: 'CONSULT',
	},
	unity_id: '63528c11c109b232759921d1',
}


const CategoryManager: CategoriesManagerContract = {
	create: vi.fn(async (category) => {
		return right(category) as any
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
	update: vi.fn(async (_id, category) => {
		return right(category) as any
	}),
	getCount: vi.fn(async (unity_id) => {
		return right(unity_id) as any
	})
}

const makeSutCreate = () => {
	const sut = new CreateCategoriesUseCase(CategoryManager)
	return { sut, }
}

const makeSutFindAll = () => {
	const sut = new FindAllCategoriesUseCase(CategoryManager)
	return { sut, }
}

const makeSutDelete = () => {
	const sut = new DeleteCategoriesByIdUseCase(CategoryManager)
	return { sut, }
}

const makeSutFindById = () => {
	const sut = new ShowCategoriesByIdUseCase(CategoryManager)
	return { sut, }
}

const makeSutUpdate = () => {
	const sut = new UpdateCategoriesByIdUseCase(CategoryManager)
	return { sut, }
}

describe('Use cases ref categories (Unit)', () => {
	describe('Create category Use Case', () => {
		it('should create category', async () => {
			const { sut } = makeSutCreate()
			const respOrErr = await sut.execute(category)
			expect(respOrErr.isRight()).toBeTruthy()
		})

		it('should return error when create category', async () => {
			const { sut } = makeSutCreate()
			vi.spyOn(CategoryManager, 'create').mockImplementationOnce(async () => {
				return left(undefined) as any
			})
			const respOrErr = await sut.execute(category)
			expect(respOrErr.isLeft()).toBeTruthy()
		})
	})

	describe('Delete category Use Case', () => {

		it('should delete category by id', async () => {
			const { sut } = makeSutDelete()
			const respOrErr = await sut.execute({ _id: '123' })
			expect(respOrErr.isRight()).toBeTruthy()
		})

		it('should return error when delete category by id', async () => {
			const { sut } = makeSutDelete()
			vi.spyOn(CategoryManager, 'delete').mockImplementationOnce(async () => {
				return left(undefined) as any
			})
			const respOrErr = await sut.execute({ _id: 'id-invalid' })
			expect(respOrErr.isLeft()).toBeTruthy()
		})

		it('should return error when delete category with id invalid', async () => {
			const { sut } = makeSutDelete()
			const respOrErr = await sut.execute({ _id: null as any })
			expect(respOrErr.isLeft()).toBeTruthy()
		})
	})

	describe('Find category by id Use Case', () => {

		it('should find category by id', async () => {
			const { sut } = makeSutFindById()
			const respOrErr = await sut.execute({ id: '123' })
			expect(respOrErr.isRight()).toBeTruthy()
		})

		it('should return error when find category by id', async () => {
			const { sut } = makeSutFindById()
			vi.spyOn(CategoryManager, 'findById').mockImplementationOnce(async () => {
				return left(undefined) as any
			})
			const respOrErr = await sut.execute({ id: 'id-invalid' })
			expect(respOrErr.isLeft()).toBeTruthy()
		})

		it('should return error when find by id category with id invalid', async () => {
			const { sut } = makeSutFindById()
			const respOrErr = await sut.execute({ id: null as any, ...category })
			expect(respOrErr.isLeft()).toBeTruthy()
		})

	})

	describe('Update category Use Case', () => {

		it('should update category', async () => {
			const { sut } = makeSutUpdate()
			const respOrErr = await sut.execute({ _id: '123', ...category })
			expect(respOrErr.isRight()).toBeTruthy()
		})

		it('should return error when update category', async () => {
			const { sut } = makeSutUpdate()
			vi.spyOn(CategoryManager, 'update').mockImplementationOnce(async () => {
				return left(undefined) as any
			})
			const respOrErr = await sut.execute({ _id: 'id-invalid', ...category })
			expect(respOrErr.isLeft()).toBeTruthy()
		})

		it('should return error when update category with id invalid', async () => {
			const { sut } = makeSutUpdate()
			const respOrErr = await sut.execute({ _id: null as any, ...category })
			expect(respOrErr.isLeft()).toBeTruthy()
		})
	})

})
