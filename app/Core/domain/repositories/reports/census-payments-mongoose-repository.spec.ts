import mongoose from 'mongoose'
import { beforeAll, describe, expect, it } from 'vitest'

import { CensusPaymentsManagerInterface } from '../interface/census-manager.interface'
import { CensusPaymentsMongooseRepository } from './census-payments-mongoose-repository'

const makeSut = () => {
	const sut: CensusPaymentsManagerInterface = new CensusPaymentsMongooseRepository()
	return {
		sut,
	}
}

describe('Census Payments Mongoose Repository (Integration)', () => {
	beforeAll(async () => {
		await mongoose.connect(
			process.env.DB_CONNECTION_STRING as string,
		)
	})

	it('should be find payments by health insurance', async () => {
		const { sut } = makeSut()

		const resultOrErr = await sut.findPaymentsByHealthInsurance(
			'6359660fc109b232759921d4',
			'2023-01-02',
			'2024-01-31',
		)

		expect(resultOrErr.isRight()).toBeTruthy()
	})

	it('should be find forms payments', async () => {
		const { sut } = makeSut()

		const resultOrErr = await sut.findPaymentsByForm(
			'6359660fc109b232759921d4',
			'2023-01-02',
			'2024-01-31',
		)

		expect(resultOrErr.isRight()).toBeTruthy()
	})

	it('should be count and payments by partners (by unity and prof)', async () => {
		const { sut } = makeSut()
		const resultOrErr = await sut.findPaymentsByPartners(
			'6359660fc109b232759921d4', // unity id
			'2023-01-01', // date start
			'2024-01-31', // date end
		)

		expect(resultOrErr.isRight()).toBeTruthy()
	})

	it('should be count and payments by prof (by unity and prof)', async () => {
		const { sut } = makeSut()
		const resultOrErr = await sut.findPaymentsByProf(
			'6359660fc109b232759921d4', // unity id
			'2023-01-01', // date start
			'2024-01-31', // date end
		)

		expect(resultOrErr.isRight()).toBeTruthy()
	})
})
