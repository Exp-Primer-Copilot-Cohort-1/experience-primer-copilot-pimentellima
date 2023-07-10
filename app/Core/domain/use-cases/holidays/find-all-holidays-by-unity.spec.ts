import mongoose from 'mongoose'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { HolidaysNationalsMongoRepository } from '../../repositories'
import { HolidaysMongoRepository } from '../../repositories/holidays/holiday-mongo-repository'
import { FindAllHolidaysByUnityUseCase } from './find-all-holidays-by-unity'
import { SaveHolidaysNationalsDefaultUseCase } from './save-holidays-nationals-default-by-year'

const makeSut = () => {
	const sut = new FindAllHolidaysByUnityUseCase(
		new HolidaysMongoRepository(),
		new SaveHolidaysNationalsDefaultUseCase(new HolidaysNationalsMongoRepository()),
	)

	return {
		sut,
	}
}

describe('Find All Holidays By Unity Use Case (Integration)', () => {
	beforeAll(async () => {
		await mongoose.connect(
			'mongodb://admin:admin@localhost/admin?connectTimeoutMS=300000&retryWrites=true',
		)
	})

	afterAll(async () => {
		await mongoose.connection.close()
	})

	it('should find all holidays by unity', async () => {
		const { sut } = makeSut()
		const response = await sut.execute({
			unity_id: '6359660fc109b232759921d4',
		})

		expect(response.isRight()).toBeTruthy()
	})
})
