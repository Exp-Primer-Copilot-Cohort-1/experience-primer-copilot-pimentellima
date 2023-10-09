import { beforeAll, describe, expect, it, vi } from 'vitest'

import { ActivityRecurrentMongoRepository } from './activity-recurrent-mongo-repository'

import { SessionTransaction } from 'App/Core/infra/session-transaction'
import mongoose from 'mongoose'


const makeSut = () => {
	const session = new SessionTransaction()
	const sut = new ActivityRecurrentMongoRepository()
	return { sut, session }
}


describe('ActivityRepository (Integration)', () => {
	vi.mock('../../entities/activities/validations-activity', () => ({
		__esModule: true,
		default: vi.fn().mockImplementation(() => {
			return {
				parse: () => {
					return true
				},
			}
		}),
	}));

	beforeAll(async () => {
		await mongoose.connect(process.env.DB_CONNECTION_STRING as string)
	})

	it('should be defined', () => {
		expect(ActivityRecurrentMongoRepository).toBeDefined()
	})

	it('should be able to find all recurrent activities', async () => {
		const { sut } = makeSut()
		const id = process.env.TEST_INTEGRATION_UNITY_ID as string
		const activitiesOrErr = await sut.findAll(id)
		expect(activitiesOrErr.isRight()).toBeTruthy()
	})
})
