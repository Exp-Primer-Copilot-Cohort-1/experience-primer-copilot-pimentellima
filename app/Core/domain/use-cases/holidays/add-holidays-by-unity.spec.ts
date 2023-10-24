import mongoose from 'mongoose'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import container from 'App/Core/shared/container'
import Unity from 'App/Models/Unity'
import { HolidayType } from 'App/Types/IHoliday'
import { AddHolidaysByUnityUseCase } from './add-holidays-by-unity'

const makeSut = () => {
	const sut = container.resolve(AddHolidaysByUnityUseCase)
	return {
		sut,
	}
}

describe('Add Holidays Use Case (Integration)', () => {
	beforeAll(async () => {
		await mongoose.connect(process.env.DB_CONNECTION_STRING as string)
	})

	afterAll(async () => {
		await mongoose.connection.close()
	})

	it('should add holidays by unity', async () => {
		const { sut } = makeSut()
		const holidayOrErr = await sut.execute({
			unity_id: process.env.TEST_INTEGRATION_UNITY_ID as string,
			date: new Date().toISOString(),
			name: 'Teste',
			type: HolidayType.Municipal,
		})

		if (holidayOrErr.isLeft()) {
			console.log(holidayOrErr.extract())
		}

		expect(holidayOrErr.isRight()).toBeTruthy()

		await Unity.updateMany(
			{},
			{
				$pull: {
					holidays: {
						name: 'Teste',
					},
				},
			},
		).exec()
	})
})
