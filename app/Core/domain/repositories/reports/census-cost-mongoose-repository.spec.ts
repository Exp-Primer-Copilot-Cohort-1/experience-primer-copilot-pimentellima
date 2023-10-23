import mongoose from 'mongoose'
import { beforeAll, describe, expect, it } from 'vitest'

import { CensusCostManagerContract } from '../interface/census-cost.interface'
import { CensusCostMongooseRepository } from './census-cost-mongoose-repository'

const makeSut = () => {
	const sut: CensusCostManagerContract = new CensusCostMongooseRepository()
	return {
		sut,
	}
}

describe('Census Cost Mongoose Repository (Integration)', () => {
	beforeAll(async () => {
		await mongoose.connect(process.env.DB_CONNECTION_STRING as string)
	})

	it('should be find payments by health insurance', async () => {
		const { sut } = makeSut()

		const resultOrErr = await sut.findCost(
			process.env.TEST_INTEGRATION_UNITY_ID as string,
			'2023-01-02',
			'2024-01-31',
		)

		expect(resultOrErr.isRight()).toBeTruthy()
	})
})
