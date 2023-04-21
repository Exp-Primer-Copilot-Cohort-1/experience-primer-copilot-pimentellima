import { test } from '@japa/runner';

import { loginAndGetToken } from '../helpers/login';

test.group('Procedure Controller', () => {
	test('display all procedures ', async ({ client }) => {
		const { token } = await loginAndGetToken(client);

		const response = await client
			.get('procedure')
			.headers({ Authorization: `Bearer ${token.token}` });

		response.assertStatus(200);

		console.log(response.body());
	});
});
