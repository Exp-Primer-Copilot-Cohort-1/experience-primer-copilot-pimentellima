import { describe, expect, it } from 'vitest'

import { UnityNotFoundError } from 'App/Core/domain/errors/unity-not-found'
import { DefaultConfigsInMemoryRepository } from 'App/Core/domain/repositories/default-configs/default-configs-in-memory-repository'
import { DeleteDefaultConfigsByIdUseCase } from './delete-default-configs-by-id-use-case'

const makeSut = () => {
	const sut = new DeleteDefaultConfigsByIdUseCase(
		new DefaultConfigsInMemoryRepository(),
	)

	return { sut }
}

describe('DeleteDefaultConfigsByIdUseCase (Unit)', () => {
	it('should return is left if unity_id is not provided', async () => {
		const { sut } = makeSut()
		const input = { name: 'não existe' }
		const configsOrErr = await sut.execute(input as any)

		expect(configsOrErr.isLeft()).toBeTruthy()
	})

	it('should return is left', async () => {
		const { sut } = makeSut()
		const configsOrErr = await sut.execute({})

		expect(configsOrErr.isLeft()).toBeTruthy()
	})
	it('should return is left if is null', async () => {
		const { sut } = makeSut()
		const configsOrErr = await sut.execute(null as any)

		expect(configsOrErr.isLeft()).toBeTruthy()
	})
	it('should return UnityNotFoundError if left', async () => {
		const { sut } = makeSut()
		const configsOrErr = await sut.execute({ id: 'id_inexistente' })

		expect(configsOrErr.isLeft()).toBeTruthy()
		expect(configsOrErr.extract()).toBeInstanceOf(UnityNotFoundError)
	})
})
