import { describe, expect, it } from 'vitest'

import { UnitNotFoundError } from 'App/Core/domain/errors/unit-not-found'
import { DirectmailsInMemoryRepository } from 'App/Core/domain/repositories'
import { UpdateDirectmailsByIdUseCase } from './update-directmails-by-id-use-case'

const makeSut = () => {
	const sut = new UpdateDirectmailsByIdUseCase(new DirectmailsInMemoryRepository())

	return { sut }
}

describe('UpdateDirectmailsByIdUseCase (Unit)', () => {
	it('should return is left if name is not provided', async () => {
		const { sut } = makeSut()
		const input = { unity_id: ' ' }
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
		const directmailsOrErr = await sut.execute({ _id: 'id_inexistente' })

		expect(directmailsOrErr.isLeft()).toBeTruthy()
		expect(directmailsOrErr.extract()).toBeInstanceOf(UnitNotFoundError)
	})
})
