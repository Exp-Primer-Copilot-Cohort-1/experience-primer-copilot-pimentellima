import { test } from '@japa/runner'

import { loginAndGetToken } from '../helpers/login'

test.group('User Controller V2', () => {
	test('display get secs', async ({ client }) => {
		const { token } = await loginAndGetToken(client)
		const response = await client
			.get('users/secs')
			.headers({ Authorization: `Bearer ${token.token}` })

		response.assertStatus(200)
	})
})
