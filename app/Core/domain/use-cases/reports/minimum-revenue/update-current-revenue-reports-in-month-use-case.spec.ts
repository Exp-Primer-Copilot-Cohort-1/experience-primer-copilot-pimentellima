import { BillingMongooseRepository } from 'App/Core/domain/repositories'
import mongoose from 'mongoose'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { UpdateCurrentBillingInMonthUseCase } from './update-current-revenue-reports-in-month-use-case'

const makeSut = () => {
	const repo = new BillingMongooseRepository()

	const sut = new UpdateCurrentBillingInMonthUseCase(repo)

	return {
		sut,
	}
}

describe('Update Current Revenue Reports in Month Use Case (Integration)', () => {
	beforeAll(async () => {
		await mongoose.connect(
			'mongodb://admin:admin@localhost/admin?connectTimeoutMS=300000&retryWrites=true',
		)
	})
	afterAll(async () => {
		await mongoose.connection.close()
	})
	it('should be current to update billing reports in month', async () => {
		const { sut } = makeSut()
		const revenueOrErr = await sut.execute({
			unity_id: '6359660fc109b232759921d4',
		})

		expect(revenueOrErr.isRight()).toBeTruthy()
	})
})
