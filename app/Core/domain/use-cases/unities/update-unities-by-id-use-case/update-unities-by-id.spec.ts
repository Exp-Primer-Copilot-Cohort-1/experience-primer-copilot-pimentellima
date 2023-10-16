import { UnitiesInMemoryRepository } from 'App/Core/domain/repositories'
import { describe, expect, it } from 'vitest'
import { UpdateUnitiesByIdUseCase } from './update-unities-by-id-use-case'

const makeSut = () => {
	const sut = new UpdateUnitiesByIdUseCase(new UnitiesInMemoryRepository())

	return { sut }
}

describe('UpdateUnitiesByIdUseCase (Unit)', () => {
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
