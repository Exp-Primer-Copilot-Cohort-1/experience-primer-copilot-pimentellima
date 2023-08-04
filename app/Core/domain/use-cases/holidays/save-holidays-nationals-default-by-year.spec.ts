import mongoose from 'mongoose'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { SaveHolidaysNationalsDefaultUseCase } from './save-holidays-nationals-default-by-year'

import { HolidaysNationalsMongoRepository } from 'App/Core/domain/repositories'
import HolidaysNationals from 'App/Models/HolidaysNationals'

const makeSut = () => {
	const repo = new HolidaysNationalsMongoRepository()
	const sut = new SaveHolidaysNationalsDefaultUseCase(repo)
	return {
		sut,
	}
}

describe('Save Holidays Nationals Default By Year (Integration)', () => {
	beforeAll(async () => {
		await mongoose.connect(
			process.env.DB_CONNECTION_STRING as string,
		)
	})

	afterAll(async () => {
		await mongoose.connection.close()
	})

	it('should save holidays nationals default by year', async () => {
		const year = 2021
		const { sut } = makeSut()
		const response = await sut.execute(year)

		expect(response.isRight()).toBeTruthy()

		const holidays = await HolidaysNationals.findOne({
			year,
		})

		expect(holidays).toBeTruthy()

		await HolidaysNationals.deleteMany({ year })
	})
})
