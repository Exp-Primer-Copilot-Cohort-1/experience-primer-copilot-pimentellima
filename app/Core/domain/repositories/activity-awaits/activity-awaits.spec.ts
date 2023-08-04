import mongoose from 'mongoose'
import { beforeAll, describe, expect, it } from 'vitest'

import { ActivityAwaitManagerInterface } from '../interface/activity-await-manager-interface'
import { ActivityAwaitMongoRepository } from './activity-await-mongo-repository'

const makeSut = () => {
	const sut: ActivityAwaitManagerInterface = new ActivityAwaitMongoRepository()
	return {
		sut,
	}
}

describe('Activity Await Mongoose Repository (Integration)', () => {
	beforeAll(async () => {
		await mongoose.connect(
			process.env.DB_CONNECTION_STRING as string,
		)
	})

	it('should be find census activities by unity', async () => {
		const { sut } = makeSut()
		const resultOrErr = await sut.findAllActivities('6359660fc109b232759921d4')
		expect(resultOrErr.isRight()).toBeTruthy()
	})
})
