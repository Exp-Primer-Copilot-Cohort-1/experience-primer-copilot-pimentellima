import { UnitNotFoundError } from 'App/Core/domain/errors/unit-not-found'
import { describe, expect, it } from 'vitest'
import { PartnerInMemoryRepository } from '../../../repositories'
import { FindPartnersByNameUseCase } from './find-partners-by-name-use-case'

const makeSut = () => {
	const sut = new FindPartnersByNameUseCase(new PartnerInMemoryRepository())

	return { sut }
}

describe('FindPartnersByNameUseCase (Unit)', () => {
	it('should return is left', async () => {
		const { sut } = makeSut()
		const partnerOrErr = await sut.execute({})

		expect(partnerOrErr.isLeft()).toBeTruthy()
	})
	it('should return UnitNotFoundError if left', async () => {
		const { sut } = makeSut()
		const input = { name: 'testpartner', unity_id: '12j4321k213' }
		const partnerOErr = await sut.execute(input)

		expect(partnerOErr.isLeft()).toBeTruthy()
		expect(partnerOErr.extract()).toBeInstanceOf(UnitNotFoundError)
	})
	it('should return is left if is null', async () => {
		const { sut } = makeSut()
		const partnerOrErr = await sut.execute(null as any)

		expect(partnerOrErr.isLeft()).toBeTruthy()
	})
})
