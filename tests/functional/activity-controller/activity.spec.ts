import { test } from '@japa/runner';

import { loginAndGetToken } from '../helpers/login';

test.group('Activity Controller', () => {
	test('display all activities by unity', async ({ client }) => {
		const { token } = await loginAndGetToken(client);

		const response = await client
			.get('activities')
			.headers({ Authorization: `Bearer ${token.token}` });
		console.log(response.body())

		response.assertStatus(200);
	});
});
