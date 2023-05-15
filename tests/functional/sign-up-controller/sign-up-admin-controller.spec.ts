/* eslint-disable @typescript-eslint/naming-convention */
import { faker } from '@faker-js/faker'
import { test } from '@japa/runner'
import User from 'App/Models/User'
import { assert } from 'chai'

import { cpf } from 'cpf-cnpj-validator'

const user = {
	is_company: false,
	unity_id: '63528c11c109b232759921d1',
	name: faker.name.fullName(),
	date_expiration: '2021-01-01',
	password: '@As12340056',
	email: faker.internet.email(),
	document: cpf.generate(),
	celphone: '(00) 00000-0000',
	type: 'admin_prof',
}

test.group('Sign Up Controller', () => {
	test('display store user', async ({ client }) => {
		const response = await client.post('user').json({
			...user,
		})
		// .headers({ Authorization: `Bearer ${token.token}` });
		response.assertStatus(200)

		const { _id } = response.body() as any

		const { deletedCount } = await User.deleteOne({ _id })
		assert.equal(deletedCount, 1)
	})
})
