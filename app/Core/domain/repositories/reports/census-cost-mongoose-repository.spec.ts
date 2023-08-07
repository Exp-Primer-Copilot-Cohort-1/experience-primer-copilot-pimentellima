import mongoose from 'mongoose'
import { beforeAll, describe, expect, it } from 'vitest'

import { CensusCostManagerInterface } from '../interface/census-cost.interface'
import { CensusCostMongooseRepository } from './census-cost-mongoose-repository'

const makeSut = () => {
	const sut: CensusCostManagerInterface = new CensusCostMongooseRepository()
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
			'6359660fc109b232759921d4',
			'2023-01-02',
			'2024-01-31',
		)

		expect(resultOrErr.isRight()).toBeTruthy()
	})
})
