import mongoose from 'mongoose'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import Unity from 'App/Models/Unity'
import { HolidaysMongoRepository } from '../../repositories/holidays/holiday-mongo-repository'
import { RemoveHolidaysByUnityUseCase } from './remove-holidays-by-unity'

const makeSut = () => {
	const sut = new RemoveHolidaysByUnityUseCase(new HolidaysMongoRepository())

	return {
		sut,
	}
}

describe('Add Holidays By Unity Use Case (Integration)', () => {
	beforeAll(async () => {
		await mongoose.connect(
			process.env.DB_CONNECTION_STRING as string,
		)
	})

	afterAll(async () => {
		await mongoose.connection.close()
	})

	it('should remove holidays by unity', async () => {
		const { sut } = makeSut()
		const _id = new mongoose.Types.ObjectId()
		const unity_id = process.env.TEST_INTEGRATION_UNITY_ID as string

		await Unity.updateOne(
			{
				_id: unity_id,
			},
			{
				$push: {
					holidays: {
						_id,
						date: '2021-01-01',
						name: 'Novo Feriado',
						type: 'municipal',
					},
				},
			},
		).exec()

		const holidayOrErr = await sut.execute({
			unity_id,
			_id: _id.toString(),
		})

		if (holidayOrErr.isLeft()) {
			console.log(holidayOrErr.extract())
		}

		expect(holidayOrErr.isRight()).toBeTruthy()
	})
})
