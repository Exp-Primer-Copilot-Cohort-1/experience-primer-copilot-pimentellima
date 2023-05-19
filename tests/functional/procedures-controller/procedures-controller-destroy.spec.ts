import { test } from '@japa/runner';
import Procedure from 'App/Models/Procedure';
import { loginAndGetToken } from '../helpers/login';

const procedureData = {
	value: 0,
	color: '#e0594b',
	name: 'teste',
	minutes: 50,
	prof: [
		{
			value: '63597857c109b232759921d9',
			label: 'MOISÉS RODRIGUES DE PAULA',
		},
	],
	health_insurance: [
		{
			value: '63597974c109b232759921dc',
			label: 'PARTICULAR',
			price: '260,00',
		},
	],
	unity_id: '63528c11c109b232759921d1',
};

test.group('Procedure Controller Destroy', () => {
	test('delete procedure', async ({ client }) => {
		// Crie um procedimento para testar a exclusão
		const { token } = await loginAndGetToken(client);
		const procedure = await Procedure.create({
			...procedureData,
			active: true,
		});

		// Faça uma solicitação de exclusão para o endpoint do controlador
		const response = await client
			.delete(`procedure/${procedure._id}`)
			.headers({ Authorization: `Bearer ${token.token}` });

		response.assertStatus(200);
	});
});
