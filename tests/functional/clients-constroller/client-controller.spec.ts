import { faker } from '@faker-js/faker'
import { test } from '@japa/runner'
import { IUserClient } from 'Types/IClient'
import { assert } from 'chai'

import Client from 'App/Models/Client'
import { cpf } from 'cpf-cnpj-validator'
import { loginAndGetToken } from '../helpers/login'

const fabricClient = (): IUserClient => ({
	unity_id: '63528c11c109b232759921d1',
	name: faker.person.fullName(),
	birth_date: faker.date.past().toISOString(),
	email: faker.internet.email(),
	document: cpf.generate(),
	celphone: faker.phone.number('(##) # ####-####'),
	active: true,
	avatar: faker.image.url(),
})

test.group('Client Controller', () => {
	test('display get all clients', async ({ client }) => {
		const { token } = await loginAndGetToken(client)
		const response = await client.get('clients').bearerToken(token.token)

		response.assertStatus(200)
	})
	test('display get all clients inatives', async ({ client }) => {
		const { token } = await loginAndGetToken(client)
		const response = await client.get('clients/inatives').bearerToken(token.token)

		response.assertStatus(200)
	})
	test('display get by id client', async ({ client }) => {
		const patient = await Client.create(fabricClient())
		const { token } = await loginAndGetToken(client)
		const response = await client
			.get(`clients/${patient._id}`)
			.bearerToken(token.token)

		response.assertStatus(200)

		const { deletedCount } = await Client.deleteOne({ _id: patient._id })
		assert.equal(deletedCount, 1)
	})

	test('display update client', async ({ client }) => {
		const patient = await Client.create(fabricClient())
		const { token } = await loginAndGetToken(client)
		const response = await client
			.put(`clients/${patient._id}`)
			.json(fabricClient())
			.bearerToken(token.token)

		response.assertStatus(200)

		const { deletedCount } = await Client.deleteOne({ _id: patient._id })
		assert.equal(deletedCount, 1)
	})

	test('display store client', async ({ client }) => {
		const { token } = await loginAndGetToken(client)
		const item = fabricClient()
		try {
			const response = await client
				.post('clients')
				.json(item)
				.bearerToken(token.token)

			response.assertStatus(200)

			response.body()
		} catch (error) { }
		const { deletedCount } = await Client.deleteMany({ name: item.name })

		assert.equal(deletedCount, 1)
	})
})
