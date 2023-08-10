import { ProceduresInMemoryRepository } from 'App/Core/domain/repositories/procedures/procedures-in-memory-repository'
import { describe, expect, it } from 'vitest'
import { UpdateProceduresByIdUseCase } from './update-procedures-by-id-use-case'

const makeSut = () => {
	const sut = new UpdateProceduresByIdUseCase(new ProceduresInMemoryRepository())

	return { sut }
}

describe('UpdateProceduresByIdUseCase (Unit)', () => {
	it('should return is left', async () => {
		const { sut } = makeSut()
		const proceduresOrErr = await sut.execute({})

		expect(proceduresOrErr.isLeft()).toBeTruthy()
	})

	it('should return is left if is null', async () => {
		const { sut } = makeSut()
		const proceduresOrErr = await sut.execute(null as any)

		expect(proceduresOrErr.isLeft()).toBeTruthy()
	})
})
