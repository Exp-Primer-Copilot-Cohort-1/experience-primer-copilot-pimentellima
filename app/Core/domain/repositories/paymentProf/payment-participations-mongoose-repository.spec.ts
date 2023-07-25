import mongoose from 'mongoose'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import Prof from 'App/Models/Prof'
import { IPaymentProf } from 'Types/IPaymentProf'
import { Types } from 'mongoose'
import { PaymentProfManagerInterface } from '../interface/payment-prof-manager-interface'
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
		label: 'teste',
		value: '643ee0a1da39798a147c02b2',
	},
	value: 10,
}

const makeSut = () => {
	const sut: PaymentProfManagerInterface = new PaymentProfMongoRepository()
	return {
		sut,
	}
}

describe('Payment Participations Mongoose Repository (Integration)', () => {
	beforeAll(async () => {
		await mongoose.connect(
			'mongodb://admin:admin@localhost/admin?connectTimeoutMS=300000&retryWrites=true',
		)
	})

	afterAll(async () => {
		await Prof.findByIdAndUpdate('643ee0a1da39798a147c02b2', {
			payment_participations: [],
		})
		await mongoose.connection.close()
	})

	it('should be find all payment participations by unity', async () => {
		const { sut } = makeSut()
		const resultOrErr = await sut.findAllPaymentProfs('6359660fc109b232759921d4')

		expect(resultOrErr.isRight()).toBeTruthy()
	})

	it('should be find all payment participations by prof', async () => {
		const { sut } = makeSut()
		const resultOrErr = await sut.findPaymentProfById('643ee0a1da39798a147c02b2')

		expect(resultOrErr.isRight()).toBeTruthy()
	})

	it('should be create payment participations by prof', async () => {
		const { sut } = makeSut()
		const resultOrErr = await sut.createPaymentProf(obj)

		expect(resultOrErr.isRight()).toBeTruthy()
	})

	it('should be update payment participations by prof', async () => {
		const { sut } = makeSut()
		const _id = new ObjectId().toString()

		await Prof.updateOne(
			{ _id: new ObjectId(obj.prof.value.toString()) },
			{
				$push: {
					payment_participations: {
						...obj,
						_id,
					},
				},
			},
		)

		const resultOrErr = await sut.updatePaymentProfById(
			{ ...obj, active: false },
			_id,
			obj.prof.value.toString(),
		)

		expect(resultOrErr.isRight()).toBeTruthy()
	})
})
