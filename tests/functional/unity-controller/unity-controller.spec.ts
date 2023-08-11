import { test } from '@japa/runner'
import Unity from 'App/Models/Unity'
import { assert } from 'chai'
import { loginAndGetToken } from '../helpers/login'

const unityData = {
	name: 'unidade update',
	is_company: false,
	document: '111222333',
	phones: ['123456789'],
	cnaes: ['CNAE1', 'CNAE2'],
	site: 'www.colheres.com',
	cep: '49100-000',
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
	email: 'nediauling@hotmail.com',
}

test.group('Unity Controller', () => {
	test('display index unity', async ({ client }) => {
		const { token } = await loginAndGetToken(client)
		const response = await client
			.get('unity?name=myUnity')
			.headers({ Authorization: `Bearer ${token.token}` })
		response.assertStatus(200)
		assert.isArray(response.body())
	}).skip()

	test('display store unity', async ({ client }) => {
		const unityData = {
			is_company: false,
			date_expiration: '2021-01-01',
			password: '123456',
			repeat_password: '123456',
			email: 'nediauling@hotmail.com',
			name: 'Test Unity',
			document: '123456789',
			type: 'admin',
		}

		const response = await client.put('unity/:id').json({
			...unityData,
		})
		response.assertStatus(200)

		const { _id } = response.body() as any

		const { deletedCount } = await Unity.deleteOne({ _id })
		assert.equal(deletedCount, 1)
	}).skip()
	test('display update unity', async ({ client }) => {
		const unity = await Unity.create({ ...unityData, active: true })

		const updatedData = {
			...unityData,
			name: 'Nova Unidade',
			address: 'Novo Endereço',
		}
		const response = await client
			.put(`unity/${unity._id}`)
			.json({ ...updatedData })
			.send()
		response.assertStatus(200)

		const updatedUnity = await Unity.findById(unity._id)

		assert.equal(updatedUnity?.name, updatedData.name)
		assert.equal(updatedUnity?.address, updatedData.address)

		const { deletedCount } = await Unity.deleteOne({ _id: unity._id })
		assert.equal(deletedCount, 1)
	}).skip()
	test('display show unity', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client
			.get('unity/6359660fc109b232759921d4')
			.bearerToken(token.token)

		response.assertStatus(200)
	}).skip()
	test('display destroy unity', async ({ client }) => {
		const unity = await Unity.create({ ...unityData, active: true })

		const response = await client.delete(`unity/${unity._id}`)

		response.assertStatus(200)
	}).skip()
})
