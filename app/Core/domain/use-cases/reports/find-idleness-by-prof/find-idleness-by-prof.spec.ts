import {
	CensusDaysMongooseRepository,
	HolidaysMongoRepository,
	HolidaysNationalsMongoRepository,
	ProfsMongooseRepository,
} from 'App/Core/domain/repositories'
import mongoose from 'mongoose'
import { beforeAll, describe, expect, it } from 'vitest'

import { FindIdlenessByProfUseCase } from './find-idleness-by-prof.use-case'

import { OptsQuery } from 'App/Core/domain/entities/helpers/opts-query'
import {
	FindAllHolidaysByUnityUseCase,
	SaveHolidaysNationalsDefaultUseCase,
} from '../../holidays'
import { DayTradesIntervalDatesByProfUseCase } from './day-trades-interval-dates'

const makeSut = () => {
	const sut = new FindIdlenessByProfUseCase(
		new CensusDaysMongooseRepository(OptsQuery.build()),
		new DayTradesIntervalDatesByProfUseCase(
			new ProfsMongooseRepository(OptsQuery.build()),
			new FindAllHolidaysByUnityUseCase(
				new HolidaysMongoRepository(),
				new SaveHolidaysNationalsDefaultUseCase(
					new HolidaysNationalsMongoRepository(),
				),
			),
		),
	)
	return {
		sut,
	}
}

describe('Find Idleness By Prof Use Case (Integration)', () => {
	beforeAll(async () => {
		await mongoose.connect(process.env.DB_CONNECTION_STRING as string)

	})

	it('should be count hours idleness by interval dates', async () => {
		const { sut } = makeSut()
		const resultOrErr = await sut.execute({
			unity_id: process.env.TEST_INTEGRATION_UNITY_ID as string,
			date_start: '2022-12-01',
			date_end: '2024-07-31',
		})

		expect(resultOrErr.isRight()).toBeTruthy()
	})
})
