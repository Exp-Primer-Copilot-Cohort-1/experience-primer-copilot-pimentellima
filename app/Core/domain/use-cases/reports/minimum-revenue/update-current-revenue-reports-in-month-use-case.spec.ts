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
		await mongoose.connect(process.env.DB_CONNECTION_STRING as string)
	})
	afterAll(async () => {
		await mongoose.connection.close()
	})
	it('should be current to update billing reports in month', async () => {
		const { sut } = makeSut()
		const revenueOrErr = await sut.execute({
			unity_id: process.env.TEST_INTEGRATION_UNITY_ID as string,
		})

		expect(revenueOrErr.isRight()).toBeTruthy()
	})
})
