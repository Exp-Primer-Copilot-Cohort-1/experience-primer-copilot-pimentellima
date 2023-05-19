import { describe, expect, it } from 'vitest'

import { UnitNotFoundError } from 'App/Core/domain/errors/unit-not-found'
import { UnitiesInMemoryRepository } from '../../../repositories'
import { DeleteUnitiesByIdUseCase } from './delete-unities-by-id-use-case'

const makeSut = () => {
	const repo = new UnitiesInMemoryRepository()
	const sut = new DeleteUnitiesByIdUseCase(repo)

	return { sut, repo }
}

describe('DeleteUnitiesByIdUseCase (Unit)', () => {
	it('should return true if right', async () => {
		const { sut, repo } = makeSut()

		const unitiesOrErr = await sut.execute({ id: repo.items[0]._id as string })

		expect(unitiesOrErr.isRight()).toBeTruthy()
	})
	it('should return UnitNotFoundError if left', async () => {
		const { sut } = makeSut()
		const unitiesOrErr = await sut.execute({ id: 'idtest4' })

		expect(unitiesOrErr.isLeft()).toBeTruthy()
		expect(unitiesOrErr.extract()).toBeInstanceOf(UnitNotFoundError)
	})
	it('should return is left', async () => {
		const { sut } = makeSut()
		const unitiesOrErr = await sut.execute({})

		expect(unitiesOrErr.isLeft()).toBeTruthy()
	})
	it('should return is left if is null', async () => {
		const { sut } = makeSut()
		const unitiesOrErr = await sut.execute(null as any)

		expect(unitiesOrErr.isLeft()).toBeTruthy()
	})
})
