/* eslint-disable @typescript-eslint/naming-convention */
import { faker } from '@faker-js/faker'
import { test } from '@japa/runner'
import User from 'App/Models/User'
import { IUserClient } from 'Types/IClient'
import { assert } from 'chai'

import { cpf } from 'cpf-cnpj-validator'
import { loginAndGetToken } from '../helpers/login'

const CLIENT: IUserClient = {
	unity_id: '63528c11c109b232759921d1',
	name: faker.name.fullName(),
	email: faker.internet.email(),
	document: cpf.generate(),
	celphone: faker.phone.number('(##) # ####-####'),
	active: true,
	avatar: faker.image.imageUrl(),
}

test.group('Client Controller', () => {
	test('display get all clients', async ({ client }) => {
		const { token } = await loginAndGetToken(client)
		const response = await client.get('clients').bearerToken(token.token)

		response.assertStatus(200)
	})
	test('display store client', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client
			.post('clients')
			.json(CLIENT)
			.bearerToken(token.token)
		// .headers({ Authorization: `Bearer ${token.token}` });
		response.assertStatus(200)

		const { _id } = response.body() as any

		const { deletedCount } = await User.deleteOne({ _id })
		assert.equal(deletedCount, 1)
	})
})
