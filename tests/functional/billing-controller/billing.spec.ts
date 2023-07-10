import { test } from '@japa/runner'
import { loginAndGetToken } from '../helpers/login'

test.group('Report Revenue Controller', () => {
	test('display all billing', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client.get('revenues').bearerToken(token.token)

		response.assertStatus(200)
	})
	test('display all billing by year', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client.get('revenues?year=2022').bearerToken(token.token)

		response.assertStatus(200)
	})
})
