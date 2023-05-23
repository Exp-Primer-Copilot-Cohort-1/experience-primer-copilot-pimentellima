import { faker } from '@faker-js/faker'
import { test } from '@japa/runner'
import Account from 'App/Models/Account'
import { assert } from 'chai'
import { loginAndGetToken } from '../helpers/login'

const newAccount = {
	name: faker.name.fullName(),
	value: 0,
	date: faker.date.future(),
	bank: 'SANTANDER',
	active: true,
	unity_id: '63528c11c109b232759921d1',
}

test.group('Account Controller', () => {
	test('display all accounts', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client.get('account').bearerToken(token.token)

		response.assertStatus(200)
	}).skip()

	test('create account', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client
			.post('account')
			.json(newAccount)
			.bearerToken(token.token)

		response.assertStatus(200)

		const { deletedCount } = await Account.deleteOne({ _id: response.body()._id })
		assert.equal(deletedCount, 1)
	}).skip()

	test('display account by id', async ({ client }) => {
		const { token } = await loginAndGetToken(client)
		const id = '6390b598373d349c09b46d84'

		const response = await client.get('account/' + id).bearerToken(token.token)
		response.assertStatus(200)
	}).skip()

	test('display account not found', async ({ client }) => {
		const { token } = await loginAndGetToken(client)
		const id = '0000b000000d349c09b46d00'

		const response = await client.get('account/' + id).bearerToken(token.token)

		response.assertStatus(404)
	})
})
