import {
	HolidaysMongoRepository,
	HolidaysNationalsMongoRepository,
	ProfsMongooseRepository,
} from 'App/Core/domain/repositories'
import mongoose from 'mongoose'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import {
	FindAllHolidaysByUnityUseCase,
	SaveHolidaysNationalsDefaultUseCase,
} from '../../holidays'
import { DayTradesIntervalDatesByProfUseCase } from './day-trades-interval-dates'

const makeSut = () => {
	const repo = new ProfsMongooseRepository()
	const repoHoliday = new HolidaysMongoRepository()
	const repoHolidayNationals = new HolidaysNationalsMongoRepository()
	const nationalsHolidayUseCase = new SaveHolidaysNationalsDefaultUseCase(
		repoHolidayNationals,
	)
	const holidayUseCase = new FindAllHolidaysByUnityUseCase(
		repoHoliday,
		nationalsHolidayUseCase,
	)
	const sut = new DayTradesIntervalDatesByProfUseCase(repo, holidayUseCase)
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
