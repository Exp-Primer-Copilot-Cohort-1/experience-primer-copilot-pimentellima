import mongoose from 'mongoose'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { CensusPaymentsManagerContract } from '../interface'
import { CensusPaymentsMongooseRepository } from './census-payments-mongoose-repository'

const makeSut = () => {
	const sut: CensusPaymentsManagerContract = new CensusPaymentsMongooseRepository()
	return {
		sut,
	}
}

describe('Census Payments Mongoose Repository (Only)', () => {
	beforeAll(async () => {
		await mongoose.connect(process.env.DB_CONNECTION_STRING as string)
	})

	afterAll(async () => {
		await mongoose.disconnect()
	})

	it('should be find payments by health insurance', async () => {
		const { sut } = makeSut()

		const resultOrErr = await sut.findPaymentsByHealthInsurance(
			process.env.TEST_INTEGRATION_UNITY_ID as string, // unity id
			'2023-01-02',
			'2024-01-31',
		)

		expect(resultOrErr.isRight()).toBeTruthy()
	})

	it('should be find forms payments', async () => {
		const { sut } = makeSut()

		const resultOrErr = await sut.findPaymentsByForm(
			process.env.TEST_INTEGRATION_UNITY_ID as string, // unity id
			'2023-01-02',
			'2024-01-31',
		)

		expect(resultOrErr.isRight()).toBeTruthy()
	})

	it('should be count and payments by partners (by unity and prof)', async () => {
		const { sut } = makeSut()
		const resultOrErr = await sut.findPaymentsByPartners(
			process.env.TEST_INTEGRATION_UNITY_ID as string, // unity id // unity id
			'2023-01-01', // date start
			'2024-01-31', // date end
		)

		expect(resultOrErr.isRight()).toBeTruthy()
	})

	it('should be count and payments by prof (by unity and prof)', async () => {
		const { sut } = makeSut()
		const resultOrErr = await sut.findPaymentsByProf(
			process.env.TEST_INTEGRATION_UNITY_ID as string, // unity id // unity id
			'2023-01-01', // date start
			'2024-01-31', // date end
		)

		expect(resultOrErr.isRight()).toBeTruthy()
	})
})
