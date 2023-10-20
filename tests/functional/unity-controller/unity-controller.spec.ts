import { faker } from '@faker-js/faker'
import { test } from '@japa/runner'
import Unity from 'App/Models/Unity'
import { assert } from 'chai'
import { cnpj, cpf } from 'cpf-cnpj-validator'
import { loginAndGetToken } from '../helpers/login'

const unityData = {
	is_company: false,
	document: cnpj.generate(),
	phones: [
		{
			value: "79999999999", // Deve ser uma string
			id: 1,               // Deve ser um número
		}
		// Outros objetos de telefone, se necessário
	], cep: '49100-000',
	address: 'Endereço da Unidade',
	neighborhood: 'Bairro',
	address_number: '123',
	complement: 'Complemento',
	city: 'Cidade',
	state: 'Sergipe',
	country: 'Brasil',
	obs: 'Observação',
	schedule_obs: 'Observação do Horário',
	date_expiration: '2023-12-31',
	email: faker.internet.email(),
}

test.group('Unity Controller', () => {
	test('display index unity', async ({ client }) => {
		const { token } = await loginAndGetToken(client)
		const response = await client
			.get('unities?name=myUnity')
			.headers({ Authorization: `Bearer ${token.token}` })
		//console.log(response.body())
		response.assertStatus(200)
		assert.isArray(response.body())
	})
	//  nao tem rota
	test('display store unity', async ({ client }) => {
		const { token } = await loginAndGetToken(client)
		const unityData = {
			is_company: false,
			date_expiration: faker.date.future(),
			password: '@Aa123456',
			repeat_password: '@Aa123456',
			email: faker.internet.email(),
			name: 'Test Unity',
			document: cpf.generate(),
			type: 'admin',
		}

		const response = await client
			.post('unities')
			.json({
				...unityData,
			})
			.bearerToken(token.token)
		response.assertStatus(200)

		const { _id } = response.body() as any

		const { deletedCount } = await Unity.deleteOne({ _id })
		assert.equal(deletedCount, 1)
	}).skip()

	test('display update unity', async ({ client }) => {
		const { token } = await loginAndGetToken(client)
		const unity = await Unity.create({ ...unityData, active: true })

		const updatedData = {
			...unityData,
			_id: unity._id,

			address_number: '456',
		}
		const response = await client
			.put(`unities/${unity._id}`)
			.json({ ...updatedData })
			.bearerToken(token.token)
		//		console.log(response.body())
		if (response.status() !== 200) {
			response.assertStatus(204)
		} else {
			response.assertStatus(200)
		}

		const updatedUnity = await Unity.findById(unity._id)

		assert.equal(updatedUnity?.address_number, updatedData.address_number)

		await Unity.deleteMany({ address_number: updatedData.address_number })
	})
	test('display show unity', async ({ client }) => {
		const { token } = await loginAndGetToken(client)
		const response = await client
			.get(`unities/6501c4785048d0b42ec3f35b`)
			.bearerToken(token.token)
		console.log(response.body())


		response.assertStatus(200)
	}).skip()

	// test('display destroy unity', async ({ client }) => {
	// 	const { token } = await loginAndGetToken(client)
	// 	const unity = await Unity.create({ ...unityData, active: true })

	// 	const response = await client
	// 		.delete(`unities/${unity._id}`)
	// 		.bearerToken(token.token)
	// 	//console.log(response.body())
	// 	response.assertStatus(200)
	// })
})
