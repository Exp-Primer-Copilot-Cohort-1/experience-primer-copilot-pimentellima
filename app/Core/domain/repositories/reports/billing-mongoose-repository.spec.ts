import mongoose from 'mongoose'
import { beforeAll, describe, expect, it } from 'vitest'

import { ReportsUnitiesManagerInterface } from '../interface/reports-unities-manager.interface'
import { BillingMongooseRepository } from './billing-mongoose-repository'

const makeSut = () => {
	const sut: ReportsUnitiesManagerInterface = new BillingMongooseRepository()
	return {
		sut,
	}
}

describe('Billing Mongoose Repository (Integration)', () => {
	beforeAll(async () => {
		await mongoose.connect(
			'mongodb://admin:admin@localhost/admin?connectTimeoutMS=300000&retryWrites=true',
		)
	})

	it('should be find incomes by month', async () => {
		const { sut } = makeSut()
		const resultOrErr = await sut.findRevenuesByMonth('6359660fc109b232759921d4')
		console.log(resultOrErr.extract())
		expect(resultOrErr.isRight()).toBeTruthy()
	})
})
