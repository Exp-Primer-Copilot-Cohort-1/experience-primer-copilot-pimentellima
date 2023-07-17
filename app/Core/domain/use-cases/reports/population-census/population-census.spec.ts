import { CensusMongooseRepository } from 'App/Core/domain/repositories'
import mongoose from 'mongoose'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { PopulationCensusByDateUseCase } from './population-census-use-case'

const makeSut = () => {
	const sut = new PopulationCensusByDateUseCase(new CensusMongooseRepository())
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
	it('should be find census activities by unity', async () => {
		const { sut } = makeSut()
		const resultOrErr = await sut.execute({
			unity_id: '6359660fc109b232759921d4', // unity id
			date_start: '2023-01-01', // date start
			date_end: '2024-01-31', // date end
		})

		expect(resultOrErr.isRight()).toBeTruthy()

		const census = resultOrErr.extract()

		// Check if each attribute in the output has the expected structure
		expect(census).toEqual(
			expect.objectContaining({
				procedures: expect.arrayContaining([
					expect.objectContaining({
						label: expect.any(String),
						count: expect.any(Number),
					}),
				]),
				health_insurances: expect.arrayContaining([
					expect.objectContaining({
						label: expect.any(String),
						count: expect.any(Number),
					}),
				]),
				partners: expect.arrayContaining([
					expect.objectContaining({
						label: expect.any(String),
						count: expect.any(Number),
					}),
				]),
				scheduled_events: expect.objectContaining({
					rescheduled: expect.any(Number),
					canceled: expect.any(Number),
					awaiting: expect.any(Number),
					completed: expect.any(Number),
					confirmed: expect.any(Number),
					scheduled: expect.any(Number),
					in_progress: expect.any(Number),
				}),
				genrer_clients: expect.objectContaining({
					female: expect.any(Number),
					male: expect.any(Number),
					not_informed: expect.any(Number),
				}),
				media_time_attendance: expect.any(Number),
				new_and_old_clients: expect.objectContaining({
					new: expect.any(Number),
					old: expect.any(Number),
				}),
			}),
		)
	})
})
