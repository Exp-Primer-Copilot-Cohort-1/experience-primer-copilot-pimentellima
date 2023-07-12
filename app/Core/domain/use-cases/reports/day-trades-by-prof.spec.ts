import {
	HolidaysMongoRepository,
	HolidaysNationalsMongoRepository,
	ProfsMongooseRepository,
} from 'App/Core/domain/repositories'
import mongoose from 'mongoose'
import { beforeAll, describe, expect, it } from 'vitest'

import {
	FindAllHolidaysByUnityUseCase,
	SaveHolidaysNationalsDefaultUseCase,
} from '../holidays'
import { DayTradesByProfUseCase } from './day-trades-by-prof'

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
	const sut = new DayTradesByProfUseCase(repo, holidayUseCase)
	return {
		sut,
	}
}

describe('Day Trade By Prof Use Case (Integration)', () => {
	beforeAll(async () => {
		await mongoose.connect(
			'mongodb://admin:admin@localhost/admin?connectTimeoutMS=300000&retryWrites=true',
		)
	})

	it('should be true', async () => {
		const { sut } = makeSut()
		const resultOrErr = await sut.execute({
			unity_id: '63528c11c109b232759921d1',
			month: 1,
			year: 2021,
			_id: '63528c12c109b232759921d3',
		})

		expect(resultOrErr.isRight()).toBeTruthy()
	})
})
