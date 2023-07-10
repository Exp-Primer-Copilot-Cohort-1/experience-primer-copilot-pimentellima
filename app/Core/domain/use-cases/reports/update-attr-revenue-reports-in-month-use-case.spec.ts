import { BillingMongooseRepository } from 'App/Core/domain/repositories'
import mongoose from 'mongoose'
import { beforeAll, describe, expect, it } from 'vitest'

import { UpdateAttrBillingInMonthUseCase } from './update-attr-revenue-reports-in-month-use-case'

const makeSut = () => {
	const sut = new UpdateAttrBillingInMonthUseCase(
		new BillingMongooseRepository(),
		'expected',
	)
	return {
		sut,
	}
}

describe('Update Attr Revenue Reports in Month Use Case (Integration)', () => {
	beforeAll(async () => {
		await mongoose.connect(
			'mongodb://admin:admin@localhost/admin?connectTimeoutMS=300000&retryWrites=true',
		)
	})

	it('should be able to update billing reports in month', async () => {
		const { sut } = makeSut()
		const revenueOrErr = await sut.execute({
			unity_id: '6359660fc109b232759921d4',
			value: 15,
			month: 1,
		})

		expect(revenueOrErr.isRight()).toBeTruthy()
	})
})
