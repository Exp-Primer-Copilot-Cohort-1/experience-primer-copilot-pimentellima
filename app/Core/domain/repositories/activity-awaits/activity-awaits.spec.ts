import mongoose from 'mongoose'
import { beforeAll, describe, expect, it } from 'vitest'

import { OptsQuery } from 'App/Core/domain/entities/helpers/opts-query'
import { ActivityAwaitManagerContract } from './activity-await-manager-interface'
import { ActivityAwaitMongoRepository } from './activity-await-mongo-repository'

const makeSut = () => {
	const sut: ActivityAwaitManagerContract = new ActivityAwaitMongoRepository(
		new OptsQuery().defineUnityId(process.env.TEST_INTEGRATION_UNITY_ID as string),
	)
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
		const resultOrErr = await sut.findAll()
		expect(resultOrErr.isRight()).toBeTruthy()
	})
})
