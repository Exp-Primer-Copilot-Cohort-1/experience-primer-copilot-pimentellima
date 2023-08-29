import mongoose from 'mongoose'
import { beforeAll, describe, expect, it } from 'vitest'

import { CensusDaysManagerInterface } from '../interface/census-days-manager.interface'
import { CensusDaysMongooseRepository } from './census-days-mongoose-repository'

const makeSut = () => {
	const sut: CensusDaysManagerInterface = new CensusDaysMongooseRepository()
	return {
		sut,
	}
}

describe('Census Mongoose Repository (Integration)', () => {
	beforeAll(async () => {
		await mongoose.connect(process.env.DB_CONNECTION_STRING as string)
	})

	it('should be count activities by day in the week', async () => {
		const { sut } = makeSut()
		const resultOrErr = await sut.findActivitiesByDaysOfWeek(
			'6359660fc109b232759921d4',
			'2022-12-01',
			'2024-07-31',
		)

		expect(resultOrErr.isRight()).toBeTruthy()
	})

	it('should be count activities by day in the month', async () => {
		const { sut } = makeSut()
		const resultOrErr = await sut.findActivitiesByDaysOfMonth(
			'6359660fc109b232759921d4',
			'2022-12-01',
			'2024-07-31',
		)

		expect(resultOrErr.isRight()).toBeTruthy()
	})

	it('should be count hours worked by prof', async () => {
		const { sut } = makeSut()
		const resultOrErr = await sut.findHoursWorked(
			'6359660fc109b232759921d4',
			'2022-12-01',
			'2024-07-31',
		)

		expect(resultOrErr.isRight()).toBeTruthy()
	})
})
