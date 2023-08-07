import {
	CensusCostMongooseRepository,
	CensusDaysMongooseRepository,
	CensusMongooseRepository,
	CensusPaymentParticipationsMongooseRepository,
	CensusPaymentsMongooseRepository,
	CensusRevenuesMongooseRepository,
} from 'App/Core/domain/repositories'
import mongoose from 'mongoose'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { PaymentsCensusByDateUseCase } from './payments-census-use-case'

const makeSut = () => {
	const sut = new PaymentsCensusByDateUseCase(
		new CensusPaymentsMongooseRepository(),
		new CensusMongooseRepository(),
		new CensusDaysMongooseRepository(),
		new CensusRevenuesMongooseRepository(),
		new CensusPaymentParticipationsMongooseRepository(),
		new CensusCostMongooseRepository(),
	)
	return {
		sut,
	}
}

describe('Population Census Use Case (Integration)', () => {
	beforeAll(async () => {
		await mongoose.connect(process.env.DB_CONNECTION_STRING as string)
	})
	afterAll(async () => {
		await mongoose.connection.close()
	})
	it('should be find census payments activities by unity', async () => {
		const { sut } = makeSut()
		const resultOrErr = await sut.execute({
			unity_id: '6359660fc109b232759921d4', // unity id
			date_start: '2023-01-01', // date start
			date_end: '2024-01-31', // date end
		})

		expect(resultOrErr.isRight()).toBeTruthy()

		const census = resultOrErr.extract()

		expect(census).toEqual(
			expect.objectContaining({
				count_by_days: expect.any(Array),
				count_by_activity_by_prof: expect.any(Array),
				payments_by_health_insurances: expect.any(Array),
				payment_by_prof: expect.any(Array),
				payment_by_partners: expect.any(Array),
				payment_participation_by_prof: expect.any(Array),
				payment_form: expect.any(Array),
				cost: expect.any(Array),
			}),
		)
	})
})
