import { describe, expect, it } from 'vitest'

import { UnitNotFoundError } from 'App/Core/domain/errors/unit-not-found'
import { CategoriesInMemoryRepository } from 'App/Core/domain/repositories/categories/categories-in-memory-repository'
import { DeleteCategoriesByIdUseCase } from './delete-categories-by-id-use-case'

const makeSut = () => {
	const sut = new DeleteCategoriesByIdUseCase(new CategoriesInMemoryRepository())

	return { sut }
}

describe('DeleteCategoriesByIdUseCase (Unit)', () => {
	it('should return is left if _id is not provided', async () => {
		const { sut } = makeSut()
		const input = { id: ' ' }
		const categoriesOrErr = await sut.execute(input as any)

		expect(categoriesOrErr.isLeft()).toBeTruthy()
	})
	it.skip('should return UnitNotFoundError if left', async () => {
		const { sut } = makeSut()
		const proceduresOrErr = await sut.execute({ id: 'id_inexistente' })

		expect(proceduresOrErr.isLeft()).toBeTruthy()
		expect(proceduresOrErr.extract()).toBeInstanceOf(UnitNotFoundError)
	})

	it('should return is left', async () => {
		const { sut } = makeSut()
		const categoriesOrErr = await sut.execute({})

		expect(categoriesOrErr.isLeft()).toBeTruthy()
	})
	it('should return is left if is null', async () => {
		const { sut } = makeSut()
		const categoriesOrErr = await sut.execute(null as any)

		expect(categoriesOrErr.isLeft()).toBeTruthy()
	})
})
