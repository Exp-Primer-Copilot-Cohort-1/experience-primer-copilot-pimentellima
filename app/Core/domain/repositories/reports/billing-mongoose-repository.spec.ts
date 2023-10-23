import mongoose from 'mongoose'
import { beforeAll, describe, expect, it } from 'vitest'

import { ReportsUnitiesManagerContract } from '../interface/reports-unities-manager.interface'
import { BillingMongooseRepository } from './billing-mongoose-repository'

const makeSut = () => {
	const sut: ReportsUnitiesManagerContract = new BillingMongooseRepository()
	return {
		sut,
	}
}

describe('Billing Mongoose Repository (Integration)', () => {
	beforeAll(async () => {
		await mongoose.connect(process.env.DB_CONNECTION_STRING as string)
	})

	it('should be find incomes by month', async () => {
		const { sut } = makeSut()
		const resultOrErr = await sut.findRevenuesByMonth(
			process.env.TEST_INTEGRATION_UNITY_ID as string,
		)

		expect(resultOrErr.isRight()).toBeTruthy()
	})
})
