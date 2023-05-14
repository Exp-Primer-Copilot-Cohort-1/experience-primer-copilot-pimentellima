import { test } from '@japa/runner';
import Unity from 'App/Models/Unity';

const unityData = {
	name: 'Nome da Unidade',
	is_company: false,
	document: '123456789',
	phones: ['123456789'],
	cnaes: ['CNAE1', 'CNAE2'],
	site: 'www.example.com',
	cep: '12345-678',
	address: 'Endereço da Unidade',
	neighbohood: 'Bairro',
	address_number: '123',
	complement: 'Complemento',
	city: 'Cidade',
	state: 'Estado',
	country: 'País',
	obs: 'Observação',
	schedule_obs: 'Observação do Horário',
	date_expiration: '2023-12-31',
	email: 'nediauling@hotmail.com',
};
test.group('Unity Controller Destroy', () => {
	test('destroy unity', async ({ client }) => {
		const unity = await Unity.create({ ...unityData, active: true });

		const response = await client.delete(`unity/${unity._id}`);

		response.assertStatus(200);
	});
});
