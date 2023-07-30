import {
	CensusMongooseRepository,
	CensusPaymentsMongooseRepository,
} from 'App/Core/domain/repositories'
import mongoose from 'mongoose'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { PaymentsCensusByDateUseCase } from './payments-census-use-case'

const makeSut = () => {
	const sut = new PaymentsCensusByDateUseCase(
		new CensusPaymentsMongooseRepository(),
		new CensusMongooseRepository(),
	)
	return {
		sut,
	}
}

describe('Population Census Use Case (Integration)', () => {
	beforeAll(async () => {
		await mongoose.connect(
			'mongodb://admin:admin@localhost/admin?connectTimeoutMS=300000&retryWrites=true',
		)
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

		console.log(census)

		// Check if each attribute in the output has the expected structure
		expect(census).toEqual(
			expect.objectContaining({
				count_by_days: expect.objectContaining({
					'0': expect.any(Number),
					'1': expect.any(Number),
					'2': expect.any(Number),
					'3': expect.any(Number),
					'4': expect.any(Number),
					'5': expect.any(Number),
					'6': expect.any(Number),
				}),
				count_by_activity_by_prof: expect.arrayContaining([
					expect.objectContaining({
						label: expect.any(String),
						value: expect.any(String),
						count: expect.any(Number),
					}),
				]),
				payments_by_health_insurances: expect.arrayContaining([
					expect.objectContaining({
						label: expect.any(String),
						value: expect.any(String),
						count: expect.any(Number),
						total: expect.any(Number),
					}),
				]),
				payment_by_prof: expect.arrayContaining([
					expect.objectContaining({
						label: expect.any(String),
						value: expect.any(String),
						count: expect.any(Number),
						total: expect.any(Number),
					}),
				]),
				payment_by_partners: expect.arrayContaining([
					expect.objectContaining({
						label: expect.any(String),
						// value: expect.any(String),
						count: expect.any(Number),
						total: expect.any(Number),
					}),
				]),
				payment_participation_by_prof: expect.any(Array),
				payment_form: expect.any([
					expect.objectContaining({
						label: expect.any(String),
						value: expect.any(String),
						count: expect.any(Number),
					}),
				]),
			}),
		)
	})
})
