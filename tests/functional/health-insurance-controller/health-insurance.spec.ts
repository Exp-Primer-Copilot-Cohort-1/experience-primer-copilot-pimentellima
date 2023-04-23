import { test } from '@japa/runner';

import { loginAndGetToken } from '../helpers/login';

test.group('Health Insurance Controller', () => {
	test('display all health insurance', async ({ client }) => {
		const { token } = await loginAndGetToken(client);

		const response = await client
			.get('health-insurance')
			.headers({ Authorization: `Bearer ${token.token}` });

		response.assertStatus(200);
	});
	test('display all health insurance inactive', async ({ client }) => {
		const { token } = await loginAndGetToken(client);

		const response = await client
			.get('health-insurance?active=false')
			.bearerToken(token.token)
			.send();

		response.assertStatus(200);
	});
});
