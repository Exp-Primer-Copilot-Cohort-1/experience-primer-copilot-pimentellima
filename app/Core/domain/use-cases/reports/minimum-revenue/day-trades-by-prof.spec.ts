import mongoose from 'mongoose'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'

import { ProfsManagerContract } from 'App/Core/domain/repositories/interface'
import { right } from 'App/Core/shared'
import container from 'App/Core/shared/container'
import { IUser } from 'App/Types/IUser'
import { FindAllHolidaysByUnityUseCase } from '../../holidays'
import { DayTradesByProfUseCase } from './day-trades-by-prof'

class ProfsMongooseRepositoryMock implements ProfsManagerContract {
	findAll = vi.fn().mockResolvedValue([])
	findById = vi.fn().mockResolvedValue(right({
		is_friday: true,
		is_monday: true,
		is_saturday: true,
		is_sunday: true,
		is_thursday: true,
		is_tuesday: true,
		is_wednesday: true,
	} as IUser))
	findByUnityId = vi.fn().mockResolvedValue([])
	getCount = vi.fn().mockResolvedValue(0)
}

const makeSut = () => {
	const findAllHolidaysByUnityUseCase = container.resolve(FindAllHolidaysByUnityUseCase)
	const sut = new DayTradesByProfUseCase(
		new ProfsMongooseRepositoryMock(),
		findAllHolidaysByUnityUseCase,
	)
	return {
		sut,
	}
}

describe('Day Trade By Prof Use Case (Integration)', () => {
	beforeAll(async () => {
		await mongoose.connect(process.env.DB_CONNECTION_STRING as string)
	})
	afterAll(async () => {
		await mongoose.connection.close()
	})
	it('should be day trades by prof', async () => {

		const { sut } = makeSut()
		const params = {
			unity_id: process.env.TEST_INTEGRATION_UNITY_ID as string,
			month: 1,
			year: 2021,
			_id: process.env.TEST_INTEGRATION_USER_ID as string,
			day: 1,
		}

		const resultOrErr = await sut.execute(params)

		if (resultOrErr.isLeft()) {
			console.log(resultOrErr.extract())
		}

		expect(resultOrErr.isRight()).toBeTruthy()
	})
})
