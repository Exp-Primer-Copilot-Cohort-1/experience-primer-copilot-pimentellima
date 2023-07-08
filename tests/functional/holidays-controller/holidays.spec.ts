import { test } from '@japa/runner'
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
})
