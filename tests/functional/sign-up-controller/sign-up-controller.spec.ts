/* eslint-disable @typescript-eslint/naming-convention */
import { faker } from '@faker-js/faker'
import { test } from '@japa/runner'
import Unity from 'App/Models/Unity'
import User from 'App/Models/User'
import { assert } from 'chai'

import { cnpj, cpf } from 'cpf-cnpj-validator'

const user = {
	is_company: false,
	unity_id: '63528c11c109b232759921d1',
	name: faker.name.fullName(),
	date_expiration: faker.date.future().toISOString(),
	password: '@As12340056',
	email: faker.internet.email(),
	document: cpf.generate(),
	celphone: '(00) 00000-0000',
	type: 'admin_prof',
}

const unity = {
	name: faker.name.fullName(),
	email: faker.internet.email(),
	document: cnpj.generate(),
	is_company: true,
	date_expiration: faker.date.future().toISOString(),
}

test.group('Sign Up User Controller', () => {
	test('display store user', async ({ client }) => {
		const response = await client.post('user').json(user)
		response.assertStatus(200)

		const { _id } = response.body() as any

		const { deletedCount } = await User.deleteOne({ _id })
		assert.equal(deletedCount, 1)
	})

	test('display store active user', async ({ client }) => {
		const create = await client.post('user').json(user)
		create.assertStatus(200)
		const { _id } = create.body() as any

		const response = await client.put(`users-confirm/${_id}`)
		response.assertStatus(200)

		const { deletedCount } = await User.deleteOne({ _id })
		assert.equal(deletedCount, 1)
	})
})

test.group('Sign Up Unity Controller', () => {
	test('display store unity', async ({ client }) => {
		const response = await client.post('unity').json(unity)
		response.assertStatus(200)

		const { _id } = response.body() as any

		const { deletedCount } = await Unity.deleteOne({ _id })
		assert.equal(deletedCount, 1)
	})
})
