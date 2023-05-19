/* eslint-disable @typescript-eslint/naming-convention */
import { test } from '@japa/runner'
import User from 'App/Models/User'
import { assert } from 'chai'

import { cpf } from 'cpf-cnpj-validator'

const user = {
	is_company: false,
	unity_id: '63528c11c109b232759921d1',
	name: 'Murilo dos Anjos Montino',
	date_expiration: '2021-01-01',
	password: '123456',
	email: 'murilomontinojr2@hotmail.com',
	document: cpf.generate(),
	celphone: '(00) 00000-0000',
	type: 'admin_prof',
}

test.group('User Controller', () => {
	test('display store user admin_prof', async ({ client }) => {
		const response = await client.post('users').json({
			...user,
		})
		// .headers({ Authorization: `Bearer ${token.token}` });
		response.assertStatus(200)

		const { _id } = response.body() as any

		const { deletedCount } = await User.deleteOne({ _id })
		assert.equal(deletedCount, 1)
	})
})
