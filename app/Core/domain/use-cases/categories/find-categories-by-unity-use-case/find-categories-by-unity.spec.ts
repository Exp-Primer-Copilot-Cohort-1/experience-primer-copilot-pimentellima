import { UnitNotFoundError } from 'App/Core/domain/errors/unit-not-found'
import { CategoriesInMemoryRepository } from 'App/Core/domain/repositories/categories/categories-in-memory-repository'
import { describe, expect, it } from 'vitest'
import { FindCategoriesByUnityUseCase } from './find-categories-by-unity-use-case'

const makeSut = () => {
	const sut = new FindCategoriesByUnityUseCase(new CategoriesInMemoryRepository())

	return { sut }
}

describe('FindCategoriesByUnityUseCase (Unit)', () => {
	it('should return is left', async () => {
		const { sut } = makeSut()
		const categoriesOrErr = await sut.execute({})

		expect(categoriesOrErr.isLeft()).toBeTruthy()
	})
	it('should return UnitNotFoundError if left', async () => {
		const { sut } = makeSut()
		const categoriesOrErr = await sut.execute({ unity_id: 'unity_inexistente' })

		expect(categoriesOrErr.isLeft()).toBeTruthy()
		expect(categoriesOrErr.extract()).toBeInstanceOf(UnitNotFoundError)
	})

	it('should return is left if is null', async () => {
		const { sut } = makeSut()
		const categoriesOrErr = await sut.execute(null as any)

		expect(categoriesOrErr.isLeft()).toBeTruthy()
	})
})
