import { HealthInsuranceInMemoryManager } from 'App/Core/domain/repositories'
import { left, right } from 'App/Core/shared'
import { describe, expect, it, vi } from 'vitest'
import { FindHealthInsuranceByIdUseCase } from './find-id-use-case'

const makeSut = () => {
	const healthInsuranceManager = new HealthInsuranceInMemoryManager()

	const sut = new FindHealthInsuranceByIdUseCase(healthInsuranceManager)

	return {
		sut,
		healthInsuranceManager,
	}
}

describe('Find Health Insurance By Id Use Case (Unit)', () => {
	it('should call healthInsuranceManager.findById', async () => {
		const { sut, healthInsuranceManager } = makeSut()

		const spyOnFindById = vi.spyOn(healthInsuranceManager, 'findById')

		const optsQuery = {
			id: '1',
		}

		// eslint-disable-next-line prettier/prettier
		const expectedResult = right({});

		// eslint-disable-next-line prettier/prettier
		(healthInsuranceManager as any).findById.mockResolvedValue(expectedResult)

		await sut.execute(optsQuery)

		expect(spyOnFindById).toHaveBeenCalledWith('1')
	})

	it('should return left if healthInsuranceManager.findById return left', async () => {
		const { sut, healthInsuranceManager } = makeSut()

		vi.spyOn(healthInsuranceManager, 'findById')

		const optsQuery = {
			id: '1',
		}

		// eslint-disable-next-line prettier/prettier
		const expectedResult = left({});

		// eslint-disable-next-line prettier/prettier
		(healthInsuranceManager as any).findById.mockResolvedValue(expectedResult)

		const resultOrErr = await sut.execute(optsQuery)

		expect(resultOrErr.isLeft()).toBeTruthy()
	})

	it('should return right if healthInsuranceManager.findById return right', async () => {
		const { sut, healthInsuranceManager } = makeSut()

		vi.spyOn(healthInsuranceManager, 'findById')

		const optsQuery = {
			id: '1',
		}

		// eslint-disable-next-line prettier/prettier
		const expectedResult = right({});

		// eslint-disable-next-line prettier/prettier
		(healthInsuranceManager as any).findById.mockResolvedValue(expectedResult)

		const resultOrErr = await sut.execute(optsQuery)

		expect(resultOrErr.isRight()).toBeTruthy()
	})

	it('should return Params Error if optsQuery is undefined/null', async () => {
		const { sut } = makeSut()

		const resultOrErr = await sut.execute(undefined as any)

		expect(resultOrErr.isLeft()).toBeTruthy()
	})
})
