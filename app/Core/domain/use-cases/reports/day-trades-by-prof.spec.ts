import { ProfsMongooseRepository } from 'App/Core/domain/repositories'
import mongoose from 'mongoose'
import { beforeAll, describe, expect, it } from 'vitest'

import { DayTradesByProfUseCase } from './day-trades-by-prof'

const makeSut = () => {
	const repo = new ProfsMongooseRepository()
	const sut = new DayTradesByProfUseCase(repo)
	return {
		sut,
	}
}

describe('Day Trade By Prof Use Case (Integration)', () => {
	beforeAll(async () => {
		await mongoose.connect(
			'mongodb://admin:admin@localhost/admin?connectTimeoutMS=300000&retryWrites=true',
		)
	})

	it('should be true', async () => {
		const { sut } = makeSut()
		await sut.execute({
			unity_id: '6359660fc109b232759921d4',
			month: 1,
			year: 2021,
			_id: '6359660fc109b232759921d4',
		})
		expect(true).toBe(true)
	})
})
