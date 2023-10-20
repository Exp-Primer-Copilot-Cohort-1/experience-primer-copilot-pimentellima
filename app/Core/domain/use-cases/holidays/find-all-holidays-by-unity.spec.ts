import mongoose from 'mongoose'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { HolidaysNationalsMongoRepository } from 'App/Core/domain/repositories'
import { HolidaysMongoRepository } from 'App/Core/domain/repositories/holidays/holiday-mongo-repository'
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
			process.env.DB_CONNECTION_STRING as string,
		)
	})

	afterAll(async () => {
		await mongoose.connection.close()
	})

	it('should find all holidays by unity', async () => {
		const { sut } = makeSut()
		const response = await sut.execute({
			unity_id: process.env.TEST_INTEGRATION_UNITY_ID as string,
		})

		expect(response.isRight()).toBeTruthy()
	})
})
