import { beforeAll, describe, expect, it, vi } from 'vitest'

import { faker } from '@faker-js/faker'
import { AppointmentStatus } from 'App/Helpers'
import { IActivity } from 'App/Types/IActivity'
import { addWeeks } from 'date-fns'
import mongoose from 'mongoose'
import { ActivityEntity } from './activity'

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

describe('Activity Entity (Unit)', () => {

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

	vi.mock('App/Core/domain/entities/helpers/fetch-user-and-schedule-blocks', () => ({
		__esModule: true,
		default: vi.fn().mockImplementation(() => {
			return {
				is_monday: true,
				is_saturday: true,
			}
		}),
	}))

	beforeAll(async () => {
		await mongoose.connect(process.env.DB_CONNECTION_STRING as string)
	})

	it('should be defined', () => {
		expect(ActivityEntity).toBeDefined()
	})

	it('should be able to create a new activity', async () => {
		const activity = mountActivity({})
		const activityOrErr = await ActivityEntity.build(activity)
		expect(activityOrErr.isRight()).toBeTruthy()
	})

	it('should be update a activity', async () => {
		const activity = mountActivity({})
		const activityOrErr = await ActivityEntity.build(activity)
		const activityEntity = activityOrErr.extract() as ActivityEntity

		const updated = activityEntity.update({
			scheduled: AppointmentStatus.AWAITING,
		})

		expect(updated.scheduled).toEqual(AppointmentStatus.AWAITING)
	})

	it('should be able to update date and rescheduled', async () => {
		const activity = mountActivity({})
		const activityOrErr = await ActivityEntity.build(activity)
		const activityEntity = activityOrErr.extract() as ActivityEntity

		const updated = activityEntity.update({
			date: addWeeks(new Date(), 2).toISOString(),
		})

		expect(updated.scheduled).toEqual(AppointmentStatus.RESCHEDULED)
	})

	it('should be able to update hour_start and rescheduled', async () => {
		const activity = mountActivity({})
		const activityOrErr = await ActivityEntity.build(activity)
		const activityEntity = activityOrErr.extract() as ActivityEntity

		const updated = activityEntity.update({
			hour_start: new Date().toISOString(),
		})

		expect(updated.scheduled).toEqual(AppointmentStatus.RESCHEDULED)
	})

	it('should be able to update hour_end and rescheduled', async () => {
		const activity = mountActivity({})
		const activityOrErr = await ActivityEntity.build(activity)
		const activityEntity = activityOrErr.extract() as ActivityEntity

		const updated = activityEntity.update({
			hour_end: new Date().toISOString(),
		})

		expect(updated.scheduled).toEqual(AppointmentStatus.RESCHEDULED)
	})

	it('should be update a activity', async () => {
		const activity = mountActivity({})
		const { date, hour_end, hour_start, ...rest } = mountActivity({})
		const activityOrErr = await ActivityEntity.build(activity)
		const activityEntity = activityOrErr.extract() as ActivityEntity

		const updated = activityEntity.update(rest)

		expect(updated).toEqual({
			...activityEntity,
			...rest,
		})
	})

	it('should be update a activity hour_start equal', async () => {
		const activity = mountActivity({})
		const activityOrErr = await ActivityEntity.build(activity)
		const activityEntity = activityOrErr.extract() as ActivityEntity

		const updated = activityEntity.update({
			hour_start: activity.hour_start,
		})

		expect(updated.scheduled).toEqual(AppointmentStatus.SCHEDULED)
	})
})
