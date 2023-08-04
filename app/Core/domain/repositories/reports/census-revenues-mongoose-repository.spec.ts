import mongoose from 'mongoose'
import { beforeAll, describe, expect, it } from 'vitest'

import { CensusRevenuesManagerInterface } from '../interface/census-revenues-manager.interface'
import { CensusRevenuesMongooseRepository } from './census-revenues-mongoose-repository'

const makeSut = () => {
	const sut: CensusRevenuesManagerInterface = new CensusRevenuesMongooseRepository()
	return {
		sut,
	}
}

describe('Census Payments Mongoose Repository (Integration)', () => {
	beforeAll(async () => {
		await mongoose.connect(process.env.DB_CONNECTION_STRING as string)
	})

	it('should be revenues accrual regime activities by year (by unity and prof)', async () => {
		const { sut } = makeSut()
		const resultOrErr = await sut.findRevenuesAccrualRegimeActivities(
			'6359660fc109b232759921d4', // unity id
			'2023-01-01', // date start
			'2024-01-01',
		)

		expect(resultOrErr.isRight()).toBeTruthy()
	})

	it('should be revenues cash regime activities by year (by unity and prof)', async () => {
		const { sut } = makeSut()
		const resultOrErr = await sut.findRevenuesCashRegimeActivities(
			'6359660fc109b232759921d4', // unity id
			'2023-01-01', // date start
			'2024-01-01',
		)

		expect(resultOrErr.isRight()).toBeTruthy()
	})
})
