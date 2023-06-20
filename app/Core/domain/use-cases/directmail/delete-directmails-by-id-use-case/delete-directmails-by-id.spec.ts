import { describe, expect, it } from 'vitest'

import { UnitNotFoundError } from 'App/Core/domain/errors/unit-not-found'
import { DirectmailsInMemoryRepository } from 'App/Core/domain/repositories'
import { DeleteDirectmailsByIdUseCase } from './delete-directmails-by-id-use-case'

const makeSut = () => {
	const sut = new DeleteDirectmailsByIdUseCase(new DirectmailsInMemoryRepository())

	return { sut }
}

describe('DeleteDirectmailsByIdUseCase (Unit)', () => {
	it('should return is left if name is not provided', async () => {
		const { sut } = makeSut()
		const input = { _id: ' ' }
		const directmailsOrErr = await sut.execute(input as any)

		expect(directmailsOrErr.isLeft()).toBeTruthy()
	})

	it('should return is left', async () => {
		const { sut } = makeSut()
		const directmailsOrErr = await sut.execute({})

		expect(directmailsOrErr.isLeft()).toBeTruthy()
	})
	it('should return is left if is null', async () => {
		const { sut } = makeSut()
		const directmailsOrErr = await sut.execute(null as any)

		expect(directmailsOrErr.isLeft()).toBeTruthy()
	})
	it('should return UnitNotFoundError if left', async () => {
		const { sut } = makeSut()
		const directmailsOrErr = await sut.execute({ id: 'id_inexistente' })

		expect(directmailsOrErr.isLeft()).toBeTruthy()
		expect(directmailsOrErr.extract()).toBeInstanceOf(UnitNotFoundError)
	})
})
