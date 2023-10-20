import { beforeAll, describe, expect, it, vi } from 'vitest'

import { ActivityMongoRepository } from './activity-mongo-repository'

import { faker } from '@faker-js/faker'
import { SessionTransaction } from 'App/Core/infra/session-transaction'
import { AppointmentStatus } from 'App/Helpers'
import Activity from 'App/Models/Activity'
import { IActivity } from 'App/Types/IActivity'
import mongoose from 'mongoose'

const ObjectId = mongoose.Types.ObjectId

const makeSut = () => {
	const session = new SessionTransaction()
	const sut = new ActivityMongoRepository(session)
	return { sut, session }
}

type MountTypes = {
	unity_id?: string
}

const mountActivity = ({
	unity_id = process.env.TEST_INTEGRATION_UNITY_ID,
}: MountTypes) => {
	return {
		client: process.env.TEST_INTEGRATION_CLIENT_ID,
		unity_id,
		prof: process.env.TEST_INTEGRATION_USER_ID,
		procedures: [
			{
				_id: process.env.TEST_INTEGRATION_PROCEDURE_ID,
				minutes: faker.number.int(),
				price: 0,
				color: faker.internet.color(),
				health_insurance: process.env.TEST_INTEGRATION_HEALTH_INSURANCE_ID,
			},
		],
		date: new Date().toISOString(),
		hour_end: faker.date.recent().toISOString(),
		hour_start: faker.date.recent().toISOString(),
	} as IActivity
}

describe('ActivityRepository (Integration)', () => {
	vi.mock('App/Core/domain/entities/activities/validations-activity', () => ({
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
		expect(ActivityMongoRepository).toBeDefined()
	})

	it('should be able to find all activities', async () => {
		const { sut } = makeSut()
		const id = new ObjectId()
		const activitiesOrErr = await sut.findAllActivities(id.toString())
		expect(activitiesOrErr.isRight()).toBeTruthy()
	})

	it('should be new activity', async () => {
		const { sut } = makeSut()
		const unity_id = process.env.TEST_INTEGRATION_UNITY_ID as string
		const activity = mountActivity({ unity_id })
		const activityOrErr = await sut.createActivity(unity_id, activity)

		if (activityOrErr.isLeft()) {
			throw activityOrErr.extract()
		}

		const activityCreated = activityOrErr.extract()
		expect(activityOrErr.isRight()).toBeTruthy()

		const { deletedCount } = await Activity.deleteMany({
			client: activityCreated.client,
		})

		expect(deletedCount).toBeGreaterThan(0)
	})

	it('should be able to find activity by id', async () => {
		const { sut } = makeSut()
		const activity = mountActivity({})
		const { _id } = await Activity.create(activity)
		const activityOrErr = await sut.findActivityById(_id.toString())
		expect(activityOrErr.isRight()).toBeTruthy()

		const { deletedCount } = await Activity.deleteOne({ _id })

		expect(deletedCount).toBe(1)
	})

	it('should be able to update activity', async () => {
		const { sut } = makeSut()

		const activity = mountActivity({})
		const { _id } = await Activity.create(activity)
		const activityOrErr = await sut.updateActivityById(_id.toString(), {
			...activity,
			scheduled: AppointmentStatus.AWAITING,
			_id: _id.toString(),
		})

		if (activityOrErr.isLeft()) {
			throw activityOrErr.extract()
		}

		expect(activityOrErr.isRight()).toBeTruthy()

		expect(activityOrErr.extract().scheduled).toBe(AppointmentStatus.AWAITING)

		const { deletedCount } = await Activity.deleteOne({ _id })

		expect(deletedCount).toBe(1)
	})
})
