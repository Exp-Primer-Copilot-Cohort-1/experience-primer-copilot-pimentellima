import { test } from '@japa/runner';
import { loginAndGetToken } from '../helpers/login';

test('Unity Controller', async ({ client }) => {
	const { token } = await loginAndGetToken(client);
	const response = await client
		.get('unity')
		.headers({ Authorization: `Bearer ${token.token}` });

	response.assertStatus(200);
});
