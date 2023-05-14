import { test } from '@japa/runner';
import Procedure from 'App/Models/Procedure';
import { assert } from 'chai';
import { loginAndGetToken } from '../helpers/login';

test.group('Procedure Controller Store', () => {
	test('display store procedure', async ({ client }) => {
		const procedureData = {
			value: 100,
			color: 'blue',
			name: 'Test Procedure',
			minutes: 60,
			partner_id: 'partner-id',
			products: ['product-1', 'product-2'],
		};

		const { token } = await loginAndGetToken(client);
		const response = await client
			.post('procedure')
			.json({
				...procedureData,
			})
			.headers({ Authorization: `Bearer ${token.token}` });
		response.assertStatus(200);

		const { _id } = response.body() as any;

		const { deletedCount } = await Procedure.deleteOne({ _id });
		assert.equal(deletedCount, 1);
	});
});
