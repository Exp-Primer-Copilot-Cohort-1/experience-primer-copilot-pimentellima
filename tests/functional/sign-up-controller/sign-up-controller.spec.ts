/* eslint-disable @typescript-eslint/naming-convention */
import { faker } from '@faker-js/faker'
import { test } from '@japa/runner'
import User from 'App/Models/User'
import { assert } from 'chai'

import { cpf } from 'cpf-cnpj-validator'
import { loginAndGetToken } from '../helpers/login'

const user = {
	is_company: false,
	unity_id: '65020873d039bf33e6dcba6b',
	name: faker.person.fullName(),
	date_expiration: faker.date.future().toISOString(),
	password: '@As12340056',
	email: faker.internet.email(),
	document: cpf.generate(),
	celphone: '(79) 9 9181-8236',
	type: 'admin_prof',
}

test.group('Sign Up User Controller', () => {
	test('display store user', async ({ client }) => {
		//user.unity_id = await Unity.findOne({}, { _id: 1 })
		const response = await client.post('user').json({ user })
		console.log(response)
		response.assertStatus(200)

		const { _id } = response.body() as any

		const { deletedCount } = await User.deleteOne({ _id })
		assert.equal(deletedCount, 1)
	}).skip()

	test('display store active user', async ({ client }) => {
		const { token } = await loginAndGetToken(client)
		const create = await client.post('user').json(user)
		create.assertStatus(200)
		const { _id } = create.body() as any

		const response = await client.put(`users-confirm/${_id}`).bearerToken(token.token)

		response.assertStatus(200)

		const { deletedCount } = await User.deleteOne({ _id })
		assert.equal(deletedCount, 1)
	}).skip()
})
