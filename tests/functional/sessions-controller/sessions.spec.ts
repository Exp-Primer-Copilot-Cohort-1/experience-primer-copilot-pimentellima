import { test } from '@japa/runner';

import { assert } from 'chai';

import { loginAndGetToken } from '../helpers/login';

test.group('Sessions Controller', () => {
	test('display post session', async ({ client }) => {
		const { token, user } = await loginAndGetToken(client);

		// Verificar se token.type é uma string e igual a 'bearer'
		assert.isString(token.type);

		assert.equal(token.type, 'bearer');

		// Verificar se token.token é uma string
		assert.isString(token.token);

		// Verificar se user é um objeto
		assert.isObject(user);
	});
});
