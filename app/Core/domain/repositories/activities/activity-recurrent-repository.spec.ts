import { beforeAll, describe, expect, it, vi } from 'vitest'

import { ActivityRecurrentMongoRepository } from './activity-recurrent-mongo-repository'

import { faker } from '@faker-js/faker'
import { SessionTransaction } from 'App/Core/infra/session-transaction'
import { RecurrentActivityValues } from 'App/Types/IActivity'
import mongoose from 'mongoose'


const makeSut = () => {
	const session = new SessionTransaction()
	const sut = new ActivityRecurrentMongoRepository()
	return { sut, session }
}

type MountTypes = {
	unity_id?: string
}
const unityId = process.env.TEST_INTEGRATION_UNITY_ID as string

const mountRecurrentActivity = ({
	unity_id = unityId,
}: MountTypes) => {
	return {
		isRecurrent: true,
		recurrences: 2,
		schedulings: 1,
		dates: [
			{
				date: new Date().toISOString(),
				hour_end: faker.date.recent().toISOString(),
				hour_start: faker.date.recent().toISOString(),
			}
		],
		client: {
			label: faker.person.fullName(),
			celphone: faker.phone.number(),
			value: process.env.TEST_INTEGRATION_CLIENT_ID as string
		},
		unity_id,
		prof: {
			label: faker.person.fullName(),
			value: process.env.TEST_INTEGRATION_USER_ID as string,
		},
		procedures: [
			{
				_id: process.env.TEST_INTEGRATION_PROCEDURE_ID as string,
				minutes: faker.number.int(),
				price: 0,
				color: faker.internet.color(),
				health_insurance: process.env.TEST_INTEGRATION_HEALTH_INSURANCE_ID as string,
			},
		]


	} as RecurrentActivityValues
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

	it('should be new recurrent activity', async () => {
		const { sut } = makeSut()
		const recurrentActivity = mountRecurrentActivity({})
		const activityOrErr = await sut.create(unityId, recurrentActivity)
		expect(activityOrErr.isRight()).toBeTruthy()
	})
})
