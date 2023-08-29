import mongoose from 'mongoose'
import { beforeAll, describe, expect, it } from 'vitest'

import {
	CensusDaysMongooseRepository,
	HolidaysMongoRepository,
	HolidaysNationalsMongoRepository,
	ProfsMongooseRepository,
} from 'App/Core/domain/repositories'

import { FindIdlenessByProfUseCase } from './find-idleness-by-prof.use-case'

import {
	FindAllHolidaysByUnityUseCase,
	SaveHolidaysNationalsDefaultUseCase,
} from '../../holidays'
import { DayTradesIntervalDatesByProfUseCase } from './day-trades-interval-dates'

const makeSut = () => {
	const sut = new FindIdlenessByProfUseCase(
		new CensusDaysMongooseRepository(),
		new DayTradesIntervalDatesByProfUseCase(
			new ProfsMongooseRepository(),
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
			unity_id: '6359660fc109b232759921d4',
			date_start: '2022-12-01',
			date_end: '2024-07-31',
		})

		expect(resultOrErr.isRight()).toBeTruthy()
	})
})
