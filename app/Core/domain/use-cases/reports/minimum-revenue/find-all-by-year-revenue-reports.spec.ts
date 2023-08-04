import { BillingMongooseRepository } from 'App/Core/domain/repositories'
import mongoose from 'mongoose'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { FindAllByYearRevenueReportsUseCase } from './find-all-by-year-revenue-reports'

const makeSut = () => {
	const repo = new BillingMongooseRepository()
	const sut = new FindAllByYearRevenueReportsUseCase(repo)
	return {
		sut,
	}
}

describe('Find all by year revenue reports (Integration)', () => {
	beforeAll(async () => {
		await mongoose.connect(
			process.env.DB_CONNECTION_STRING as string,
		)
	})

	afterAll(async () => {
		await mongoose.connection.close()
	})

	it('should be able to find all billing reports by year', async () => {
		const { sut } = makeSut()
		const revenueOrErr = await sut.execute({
			unity_id: '6359660fc109b232759921d4',
			year: 2021,
		})

		expect(revenueOrErr.isRight()).toBeTruthy()
	})
})
