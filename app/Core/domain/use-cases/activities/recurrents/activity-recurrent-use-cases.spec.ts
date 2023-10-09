import { beforeAll, describe, expect, it, vi } from 'vitest'

import { faker } from '@faker-js/faker'
import Activity from 'App/Models/Activity'
import ActivityPending from 'App/Models/ActivityPending'
import { RecurrentActivityValues } from 'App/Types/IActivity'
import mongoose from 'mongoose'
import { container } from 'tsyringe'
import { CreateRecurrentActivityUseCase } from './create-recurrent-activity-use-case'


const makeSut = () => {
	const sut = container.resolve(CreateRecurrentActivityUseCase)
	return { sut }
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

describe('Activity Recurrent Use Cases (Integration)', () => {

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

	describe('Create Recurrent Activity Use Case', () => {

		it('should be defined', () => {
			expect(CreateRecurrentActivityUseCase).toBeDefined()
		})

		it('should be new recurrent activity', async () => {
			const { sut } = makeSut()
			const recurrentActivity = mountRecurrentActivity({})
			const activityOrErr = await sut.execute(recurrentActivity)

			if (activityOrErr.isLeft()) throw activityOrErr.extract()

			expect(activityOrErr.isRight()).toBeTruthy()

			const activity = activityOrErr.extract()

			const { deletedCount: deletedCountActivity } = await Activity.deleteMany({ group_id: activity[0].group_id }).exec()
			const { deletedCount: deletedCountPending } = await ActivityPending.deleteMany({ group_id: activity[0].group_id }).exec()

			expect(deletedCountActivity).toBe(1)
			expect(deletedCountPending).toBe(1)

		})
	})
})
