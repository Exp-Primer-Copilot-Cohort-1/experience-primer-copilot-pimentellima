import { test } from '@japa/runner';
import { loginAndGetToken } from '../helpers/login';


test.group('Form Controller', () => {
	test('display all forms', async ({ client }) => {
		const { token } = await loginAndGetToken(client);

		const response = await client
			.get('form')
			.bearerToken(token.token);

		response.assertStatus(200);
	});
});
