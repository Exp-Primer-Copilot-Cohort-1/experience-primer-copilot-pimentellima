import { test } from '@japa/runner'
import { loginAndGetToken } from '../helpers/login'

test.group('Activity Await Controller', () => {
	test('display all activities await', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client.get('activities/await').bearerToken(token.token)

		response.assertStatus(200)
	})
})
