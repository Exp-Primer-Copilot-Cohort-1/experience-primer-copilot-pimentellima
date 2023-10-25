import mongoose from 'mongoose'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'

import { ProfsManagerContract } from 'App/Core/domain/repositories/interface'
import { right } from 'App/Core/shared'
import container from 'App/Core/shared/container'
import { IUser } from 'App/Types/IUser'
import {
	FindAllHolidaysByUnityUseCase
} from '../../holidays'
import { DayTradesIntervalDatesByProfUseCase } from './day-trades-interval-dates'
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

	const sut = new DayTradesIntervalDatesByProfUseCase(
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
		const resultOrErr = await sut.execute({
			unity_id: process.env.TEST_INTEGRATION_UNITY_ID as string,
			id: process.env.TEST_INTEGRATION_USER_ID as string,
			date_end: '2023-01-31T03:00:00.000Z',
			date_start: '2021-01-01T03:00:00.000Z',
			count: 0,
			name: 'Teste',
		})

		console.log(resultOrErr)

		expect(resultOrErr.isRight()).toBeTruthy()
	})
})
