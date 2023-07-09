import { test } from '@japa/runner'
import Unity from 'App/Models/Unity'
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
			type: 'teste',
		}

		const { token } = await loginAndGetToken(client)

		const responseNew = await client
			.post('holidays')
			.json(newHoliday)
			.bearerToken(token.token)

		responseNew.assertStatus(200)

		// const responseDelete = await client
		// 	.delete(`holidays/${_id}`)
		// 	.bearerToken(token.token)

		// responseDelete.assertStatus(200)

		await Unity.findByIdAndUpdate(
			'6359660fc109b232759921d4',
			{
				$pull: { holidays: { name: 'Feriado', type: 'teste' } },
			},
			{ new: true, useFindAndModify: false },
		)
			.select('holidays')
			.exec()
	})
})
