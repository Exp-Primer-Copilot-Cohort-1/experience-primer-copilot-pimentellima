import { UnitNotFoundError } from 'App/Core/domain/errors/unit-not-found'
import { PartnerInMemoryRepository } from 'App/Core/domain/repositories'
import { describe, expect, it } from 'vitest'
import { UpdatePartnersByIdUseCase } from './partner-update-by-id-use-case'

const makeSut = () => {
	const sut = new UpdatePartnersByIdUseCase(new PartnerInMemoryRepository())

	return { sut }
}

describe('UpdatePartnersByIdUseCase (Unit)', () => {
	it('should return is left', async () => {
		const { sut } = makeSut()
		const partnersOrErr = await sut.execute({})

		expect(partnersOrErr.isLeft()).toBeTruthy()
	})
	it('should return UnitNotFoundError if left', async () => {
		const { sut } = makeSut()
		const input = { _id: 'nao_existe' }
		const partnerOErr = await sut.execute(input)

		expect(partnerOErr.isLeft()).toBeTruthy()
		expect(partnerOErr.extract()).toBeInstanceOf(UnitNotFoundError)
	})

	it('should return is left if is null', async () => {
		const { sut } = makeSut()
		const partnersOrErr = await sut.execute(null as any)

		expect(partnersOrErr.isLeft()).toBeTruthy()
	})
})
