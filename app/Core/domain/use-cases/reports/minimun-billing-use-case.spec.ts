import { ProfsMongooseRepository } from 'App/Core/domain/repositories'
import mongoose from 'mongoose'
import { beforeAll, describe, expect, it } from 'vitest'

import { DayTradesByProfUseCase } from './day-trades-by-prof'
import { MinimumBillingReportUseCase } from './minimun-billing-use-case'

const makeSut = () => {
	const repo = new ProfsMongooseRepository()
	const sut = new MinimumBillingReportUseCase(repo)
	return {
		sut,
	}
}

describe('MinimumBillingReportUseCase (Integration)', () => {
	beforeAll(async () => {
		await mongoose.connect(
			'mongodb://admin:admin@localhost/admin?connectTimeoutMS=300000&retryWrites=true',
		)
	})

	it('should be true', async () => {
		const { sut } = makeSut()
		await sut.execute({ unity_id: '6359660fc109b232759921d4' })
		await new DayTradesByProfUseCase().execute({} as any)
		expect(true).toBe(false)
	})
})
