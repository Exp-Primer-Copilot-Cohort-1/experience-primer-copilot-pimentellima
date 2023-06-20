import { UnitNotFoundError } from 'App/Core/domain/errors/unit-not-found'
import { CategoriesInMemoryRepository } from 'App/Core/domain/repositories/categories/categories-in-memory-repository'
import { describe, expect, it } from 'vitest'
import { UpdateCategoriesByIdUseCase } from './update-categories-by-id-use-case'

const makeSut = () => {
	const sut = new UpdateCategoriesByIdUseCase(new CategoriesInMemoryRepository())

	return { sut }
}

describe('UpdateCategoriesByIdUseCase (Unit)', () => {
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
	it('should return UnitNotFoundError if left', async () => {
		const { sut } = makeSut()
		const categoriesOrErr = await sut.execute({ _id: 'id_inexistente' })

		expect(categoriesOrErr.isLeft()).toBeTruthy()
		expect(categoriesOrErr.extract()).toBeInstanceOf(UnitNotFoundError)
	})
})
