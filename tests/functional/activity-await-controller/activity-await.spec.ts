import { test } from '@japa/runner'
import { loginAndGetToken } from '../helpers/login'

test.group('Activity Await Controller', () => {
	test('display all activities', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client.get('activity-await').bearerToken(token.token)

		response.assertStatus(200)
	})
})
