import mongoose from 'mongoose'
import { beforeAll, describe, expect, it } from 'vitest'

import { CensusPaymentParticipationsManagerInterface } from '../interface/census-payment-participations.interface'
import { CensusPaymentParticipationsMongooseRepository } from './census-participations-mongoose-repository'

const makeSut = () => {
	const sut: CensusPaymentParticipationsManagerInterface =
		new CensusPaymentParticipationsMongooseRepository()
	return {
		sut,
	}
}

describe('Census Payments Mongoose Repository (Integration)', () => {
	beforeAll(async () => {
		await mongoose.connect(process.env.DB_CONNECTION_STRING as string)
	})

	it('should be find payments by health insurance', async () => {
		const { sut } = makeSut()

		const resultOrErr = await sut.findPaymentsParticipation(
			process.env.TEST_INTEGRATION_UNITY_ID as string, // unity id,
			'2023-01-02',
			'2024-01-31',
		)

		expect(resultOrErr.isRight()).toBeTruthy()
	})
})
