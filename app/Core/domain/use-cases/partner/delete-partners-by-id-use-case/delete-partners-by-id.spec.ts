import { describe, expect, it } from 'vitest'

import { UnitNotFoundError } from 'App/Core/domain/errors/unit-not-found'
import { PartnerInMemoryRepository } from 'App/Core/domain/repositories'
import { DeletePartnerByIdUseCase } from './delete-partners-by-id-use-case'

const makeSut = () => {
	const sut = new DeletePartnerByIdUseCase(new PartnerInMemoryRepository())

	return { sut }
}

describe('DeletePartnerByIdUseCase (Unit)', () => {
	it('should return is left if _id is not provided', async () => {
		const { sut } = makeSut()
		const input = { id: ' ' }
		const partnerOrErr = await sut.execute(input as any)

		expect(partnerOrErr.isLeft()).toBeTruthy()
	})
	it('should return UnitNotFoundError if left', async () => {
		const { sut } = makeSut()
		const proceduresOrErr = await sut.execute({ id: 'idtest5' })

		expect(proceduresOrErr.isLeft()).toBeTruthy()
		expect(proceduresOrErr.extract()).toBeInstanceOf(UnitNotFoundError)
	})

	it('should return is left', async () => {
		const { sut } = makeSut()
		const partnerOrErr = await sut.execute({})

		expect(partnerOrErr.isLeft()).toBeTruthy()
	})
	it('should return is left if is null', async () => {
		const { sut } = makeSut()
		const partnerOrErr = await sut.execute(null as any)

		expect(partnerOrErr.isLeft()).toBeTruthy()
	})
})
