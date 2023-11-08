import { faker } from '@faker-js/faker'
import { test } from '@japa/runner'
import { IUserClient } from 'App/Types/IClient'
import { expect } from 'chai'

import Client from 'App/Models/Client'
import { cpf } from 'cpf-cnpj-validator'
import { loginAndGetToken } from '../helpers/login'

type FabricProps = {
	birth_date?: string | Date
}

const fabricClient = ({
	birth_date = '1990-01-01',
}: FabricProps): IUserClient => ({
	unity_id: process.env.TEST_INTEGRATION_UNITY_ID as string,
	name: 'João da Silva',
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
		expect(deletedCount).to.greaterThan(0)
	})

	test('display update client', async ({ client }) => {
		const clientPatient = fabricClient({})
		await Client.deleteMany({ name: 'João da Silva' })
		const patient = await Client.create(clientPatient)

		const { token } = await loginAndGetToken(client)
		const _id = patient.toObject()._id.toString()

		const response = await client
			.put(`clients/update/${_id}`)
			.json({
				...clientPatient,
				name: 'name updated'
			})
			.bearerToken(token.token)

		response.assertStatus(200 | 204)

		const { deletedCount } = await Client.deleteMany({ name: 'name updated' })
		expect(deletedCount).to.greaterThan(0)
	})

	test('display store client', async ({ client }) => {
		const item = fabricClient({})
		await Client.deleteMany({ name: 'João da Silva' })

		const { token } = await loginAndGetToken(client)
		const response = await client
			.post('clients')
			.json(item)
			.bearerToken(token.token)

		response.assertStatus(200 | 204)

		response.body()
		const { deletedCount } = await Client.deleteMany({ name: 'João da Silva' })

		expect(deletedCount).to.greaterThan(0)
	}).skip()

	test('display store patient minor age', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const item = fabricClient({
			birth_date: '2010-01-01',
		})

		const response = await client
			.post('clients')
			.json(item)
			.bearerToken(token.token)

		response.assertStatus(400)

	})
})
