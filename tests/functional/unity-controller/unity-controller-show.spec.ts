import { test } from '@japa/runner';
import { loginAndGetToken } from '../helpers/login';

test('Unity Controller Show', async ({ client }) => {
	const { token } = await loginAndGetToken(client);

	const response = await client
		.get('unity/6359660fc109b232759921d4')
		.headers({ Authorization: `Bearer ${token.token}` });

	response.assertStatus(200);
});
