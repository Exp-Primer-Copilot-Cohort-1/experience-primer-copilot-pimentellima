import { faker } from '@faker-js/faker'
import { test } from '@japa/runner'
import Account from 'App/Models/Account'
import { assert } from 'chai'
import { loginAndGetToken } from '../helpers/login'

import { Types } from '@ioc:Mongoose'
const { ObjectId } = Types

const newAccount = {
	name: faker.person.fullName(),
	value: 0,
	date: faker.date.future(),
	bank: 'SANTANDER',
	active: true,
	unity_id: '63528c11c109b232759921d1',
}

test.group('Account Controller', () => {
	test('display all accounts', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client.get('accounts').bearerToken(token.token)

		response.assertStatus(200)
	})

	test('create account', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client
			.post('accounts')
			.json(newAccount)
			.bearerToken(token.token)

		response.assertStatus(200)

		const { deletedCount } = await Account.deleteOne({ _id: response.body()._id })
		assert.equal(deletedCount, 1)
	})

	test('display account by id', async ({ client }) => {
		const account = await Account.create(newAccount)
		const { token } = await loginAndGetToken(client)
		const id = account._id.toString()

		const response = await client.get('accounts/' + id).bearerToken(token.token)
		response.assertStatus(200)

		const { deletedCount } = await Account.deleteOne({ _id: id })

		assert.equal(deletedCount, 1)
	})

	test('display account not found', async ({ client }) => {
		const { token } = await loginAndGetToken(client)
		const id = new ObjectId().toString()

		const response = await client.get('accounts/' + id).bearerToken(token.token)

		response.assertStatus(404)
	})

	test('display account invalid id', async ({ client }) => {
		const { token } = await loginAndGetToken(client)
		const id = '0'

		const response = await client.get('accounts/' + id).bearerToken(token.token)

		response.assertStatus(400)
	})

	test('update account', async ({ client }) => {
		const account = await Account.create(newAccount)
		const { token } = await loginAndGetToken(client)
		const id = account._id.toString()

		const response = await client
			.put('accounts/' + id)
			.json({ name: 'new name' })
			.bearerToken(token.token)

		response.assertStatus(200)

		const body = response.body()
		const { deletedCount } = await Account.deleteOne({ _id: id })
		assert.equal(deletedCount, 1)
		assert.equal(body.name, 'new name')
	})
})
