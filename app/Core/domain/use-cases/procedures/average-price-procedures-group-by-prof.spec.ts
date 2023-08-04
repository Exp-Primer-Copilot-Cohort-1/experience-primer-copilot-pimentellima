import mongoose from 'mongoose'
import { beforeAll, describe, expect, it } from 'vitest'

import { AveragePriceProceduresUseCase } from './average-price-procedures-group-by-prof'

const makeSut = () => {
	const sut = new AveragePriceProceduresUseCase()

	return {
		sut,
	}
}

describe('Average Price Procedures Group By Prof ID (Integration)', () => {
	beforeAll(async () => {
		await mongoose.connect(
			process.env.DB_CONNECTION_STRING as string,
		)
	})

	it('should return the average price of procedures', async () => {
		const { sut } = makeSut()
		const unity_id = '63528c11c109b232759921d1'

		const proceduresOrErr = await sut.execute({ unity_id })

		expect(proceduresOrErr.isRight()).toBeTruthy()
	})
})
