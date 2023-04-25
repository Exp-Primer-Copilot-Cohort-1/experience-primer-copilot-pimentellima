import { test } from '@japa/runner';

import { loginAndGetToken } from '../helpers/login';

test.group('Health Insurance Controller', () => {
	test('display all health insurance', async ({ client }) => {
		const { token } = await loginAndGetToken(client);

		const response = await client
			.get('health-insurance')
			.bearerToken(token.token);

		response.assertStatus(200);
	});
	test('display all health insurance inactive', async ({ client }) => {
		const { token } = await loginAndGetToken(client);

		const response = await client
			.get('health-insurance?active=false')
			.bearerToken(token.token);

		response.assertStatus(200);
	});

	test('display all health insurance name equal Convênio', async ({
		client,
	}) => {
		const { token } = await loginAndGetToken(client);

		const response = await client
			.get('health-insurance?name=Convênio&active=false')
			.bearerToken(token.token);

		response.assertStatus(200);
	});
});
