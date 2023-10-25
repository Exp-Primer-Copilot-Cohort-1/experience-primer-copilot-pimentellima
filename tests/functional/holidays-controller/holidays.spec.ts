import { test } from '@japa/runner'
import Unity from 'App/Models/Unity'
import { HolidayType } from 'App/Types/IHoliday'
import { loginAndGetToken } from '../helpers/login'

test.group('Holidays Controller', () => {
	test('display all holidays by unity', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client.get('holidays').bearerToken(token.token)

		response.assertStatus(200)
	})

	test('display all holidays by unity and year', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client.get('holidays?year=2022').bearerToken(token.token)

		response.assertStatus(200)
	})

	test('display add and remove holiday by unity', async ({ client }) => {
		const newHoliday = {
			date: new Date().toISOString(),
			name: 'Feriado',
			type: HolidayType.Municipal,
		}

		const { token } = await loginAndGetToken(client)

		const response = await client
			.post('holidays')
			.json(newHoliday)
			.bearerToken(token.token)

		response.assertStatus(200 | 204)

		await Unity.findByIdAndUpdate(
			'6359660fc109b232759921d4',
			{
				$pull: { holidays: { name: 'Feriado', type: HolidayType.Municipal } },
			},
			{ new: true },
		)
			.select('holidays')
			.exec()

	})


})
