import mongoose from 'mongoose'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import PaymentParticipations from 'App/Models/PaymentParticipations'
import { IPaymentProf } from 'App/Types/IPaymentProf'
import { Types } from 'mongoose'
import { PaymentProfManagerContract } from '../interface/payment-prof-manager-interface'
import { PaymentProfMongoRepository } from './payment-prof-mongo-repository'

const ObjectId = Types.ObjectId

const obj: IPaymentProf = {
	active: true,
	percent: 10,
	health_insurance: {
		label: 'teste',
		value: '6359660fc109b232759921d4',
	},
	procedure: {
		label: 'teste',
		value: '6359660fc109b232759921d4',
	},
	prof: {
		label: 'Rodrigo',
		value: '6359660fc109b232759921d6',
	},
	unity_id: '6359660fc109b232759921d4',
	value: 10,
}

const makeSut = () => {
	const sut: PaymentProfManagerContract = new PaymentProfMongoRepository()
	return {
		sut,
	}
}

describe('Payment Participations Mongoose Repository (Integration)', () => {
	beforeAll(async () => {
		await mongoose.connect(process.env.DB_CONNECTION_STRING as string)
	})

	afterAll(async () => {
		await PaymentParticipations.findOneAndUpdate(
			{ 'prof.value': '6359660fc109b232759921d6' },
			{
				prices: [],
			},
		)
		await mongoose.connection.close()
	})

	it('should be find all payment participations by unity', async () => {
		const { sut } = makeSut()
		const resultOrErr = await sut.findAllPaymentProfs('6359660fc109b232759921d4')

		expect(resultOrErr.isRight()).toBeTruthy()
	})

	it('should be find all payment participations by prof', async () => {
		const { sut } = makeSut()
		const resultOrErr = await sut.findPaymentProfById('6359660fc109b232759921d6')

		expect(resultOrErr.isRight()).toBeTruthy()
	})


})
