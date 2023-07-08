import {
	BillingMongooseRepository,
	ProfsMongooseRepository,
} from 'App/Core/domain/repositories'
import mongoose from 'mongoose'
import { beforeAll, describe, expect, it } from 'vitest'

import { UpdateDesirableInMonthUseCase } from './update-desirable-in-month-use-case'

const makeSut = () => {
	const repo = new ProfsMongooseRepository()
	const sut = new UpdateDesirableInMonthUseCase(new BillingMongooseRepository())
	return {
		sut,
	}
}

describe('Update Desirable in Month Use Case (Integration)', () => {
	beforeAll(async () => {
		await mongoose.connect(
			'mongodb://admin:admin@localhost/admin?connectTimeoutMS=300000&retryWrites=true',
		)
	})

	it('should be true', async () => {
		const { sut } = makeSut()
		await sut.execute({
			unity_id: '6359660fc109b232759921d4',
			desirable: 15,
			month: 1,
		})
		expect(true).toBe(false)
	})
})
