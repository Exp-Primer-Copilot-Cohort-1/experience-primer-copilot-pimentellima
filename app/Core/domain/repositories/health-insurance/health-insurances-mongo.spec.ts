import { MissingParamsError } from 'App/Core/domain/errors/missing-params'
import { Model } from '__mocks__/model'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { HealthInsuranceMongoRepository } from './health-insurance-mongo-repository'

const makeSut = () => {
	const sut = new HealthInsuranceMongoRepository()

	return {
		sut,
	}
}

describe.skip('Health Insurance Mongo Repository (Unit)', () => {
	beforeAll(async () => {
		vi.mock('App/Models/HealthInsurance', () => ({
			__esModule: true,
			default: Model,
		}))
	})

	it('should call HealthInsurance.find when name is provided', async () => {
		const { sut } = makeSut()
		const resultOrErr = await sut.findAllByName('test', '1')

		expect(resultOrErr.isRight()).toBeTruthy()
		expect(resultOrErr.extract()).toBeInstanceOf(Array)
	})

	it('should call HealthInsurance.find when name is not provided', async () => {
		const { sut } = makeSut()

		const resultOrErr = await sut.findAllByName(null as any, '1')

		expect(resultOrErr.isLeft()).toBeTruthy()
		expect(resultOrErr.extract()).toBeInstanceOf(MissingParamsError)
	})

	it('should call HealthInsurance.find when name is not provided', async () => {
		const { sut } = makeSut()

		const resultOrErr = await sut.findAllByName(null as any, null as any)

		expect(resultOrErr.isLeft()).toBeTruthy()
		expect(resultOrErr.extract()).toBeInstanceOf(MissingParamsError)
	})

	it('should call HealthInsurance.find when unity_id is provided', async () => {
		const { sut } = makeSut()
		const resultOrErr = await sut.findAllByUnityId('1')

		expect(resultOrErr.isRight()).toBeTruthy()
		expect(resultOrErr.extract()).toBeInstanceOf(Array)
	})

	it('should call HealthInsurance.find when unity_id is not provided', async () => {
		const { sut } = makeSut()

		const resultOrErr = await sut.findAllByUnityId(null as any)

		expect(resultOrErr.isLeft()).toBeTruthy()
		expect(resultOrErr.extract()).toBeInstanceOf(MissingParamsError)
	})
})
