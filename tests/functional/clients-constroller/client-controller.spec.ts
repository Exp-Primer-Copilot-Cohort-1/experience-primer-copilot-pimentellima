import { faker } from '@faker-js/faker'
import { test } from '@japa/runner'
import { IUserClient } from 'App/Types/IClient'
import { assert } from 'chai'

import Client from 'App/Models/Client'
import { cpf } from 'cpf-cnpj-validator'
import { subYears } from 'date-fns'
import { loginAndGetToken } from '../helpers/login'

const fabricClient = ({
	birth_date = subYears(faker.date.anytime(), 21),
}): IUserClient => ({
	unity_id: process.env.TEST_INTEGRATION_UNITY_ID as string,
	name: faker.person.fullName(),
	birth_date,
	email: faker.internet.email(),
	document: cpf.generate(),
	celphone: faker.phone.number(),
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
		const response = await client.get('clients?active=false').bearerToken(token.token)

		response.assertStatus(200)
	})
	test('display get by id client', async ({ client }) => {
		const patient = await Client.create(fabricClient({}))
		const { token } = await loginAndGetToken(client)
		const response = await client
			.get(`clients/${patient._id}`)
			.bearerToken(token.token)

		response.assertStatus(200)

		const { deletedCount } = await Client.deleteOne({ _id: patient._id })
		assert.equal(deletedCount, 1)
	})

	test('display update client', async ({ client }) => {
		const clientPatient = fabricClient({})
		await Client.deleteMany({ name: clientPatient.name })
		const patient = await Client.create(clientPatient)

		const { token } = await loginAndGetToken(client)
		const response = await client
			.put(`clients/${patient._id}`)
			.json(fabricClient({}))
			.bearerToken(token.token)

		response.assertStatus(200 | 204)

		const { deletedCount } = await Client.deleteMany({ name: clientPatient.name })
		assert.equal(deletedCount, 1)
	})

	test('display store client', async ({ client }) => {
		const item = fabricClient({})
		await Client.deleteMany({ name: item.name })

		const { token } = await loginAndGetToken(client)
		const response = await client
			.post('clients')
			.json(item)
			.bearerToken(token.token)

		response.assertStatus(200 | 204)

		response.body()
		const { deletedCount } = await Client.deleteMany({ name: item.name })

		assert.equal(deletedCount, 1)
	})

	test('display store patient minor age', async ({ client }) => {
		const { token } = await loginAndGetToken(client)
		const item = fabricClient({
			birth_date: faker.date.recent(),
		})
		const response = await client
			.post('clients')
			.json(item)
			.bearerToken(token.token)

		response.assertStatus(400)

	})
})
