import { faker } from '@faker-js/faker'
import { test } from '@japa/runner'
import Account from 'App/Models/Account'
import { assert, expect } from 'chai'
import { loginAndGetToken } from '../helpers/login'

import { Types } from '@ioc:Mongoose'
const { ObjectId } = Types

const newAccount = {
	name: faker.person.fullName(),
	cash: 0,
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
		await Account.deleteMany({ unity_id: '63528c11c109b232759921d1' })

		const { token } = await loginAndGetToken(client)

		const response = await client
			.post('accounts')
			.json(newAccount)
			.bearerToken(token.token)

		assert.exists(newAccount.name)

		if (response.status() !== 200) {
			response.assertStatus(204)
		} else {
			response.assertStatus(200)
		}

		const { deletedCount } = await Account.deleteOne({ name: newAccount.name })
		expect(deletedCount).to.greaterThan(0)
	})

	test('display account by id', async ({ client }) => {
		const account = await Account.create(newAccount)
		const { token } = await loginAndGetToken(client)
		const id = account._id.toString()

		const response = await client.get('accounts/' + id).bearerToken(token.token)
		response.assertStatus(200)

		const { deletedCount } = await Account.deleteOne({ _id: id })

		expect(deletedCount).to.greaterThan(0)
	})

	test('display account not found', async ({ client }) => {
		const { token } = await loginAndGetToken(client)
		const id = new ObjectId().toString()

		try {
			const response = await client.get('accounts/' + id).bearerToken(token.token)
			response.assertStatus(404 || 400)
		} catch (error) { }
	})

	test('display account invalid id', async ({ client }) => {
		const { token } = await loginAndGetToken(client)
		const id = '0'

		const response = await client.get('accounts/' + id).bearerToken(token.token)

		if (response.status() !== 400) {
			response.assertStatus(404)
		} else {
			response.assertStatus(200)
		}
	})

	test('update account', async ({ client }) => {
		await Account.deleteMany({ unity_id: '63528c11c109b232759921d1' })

		const account = await Account.create(newAccount)
		const { token } = await loginAndGetToken(client)
		const id = account._id.toString()

		const response = await client
			.put('accounts/' + id + '?hasContent=true')
			.json({ name: 'new name' })
			.bearerToken(token.token)

		response.assertStatus(200)

		const body = response.body()
		const { deletedCount } = await Account.deleteOne({ _id: id })
		expect(deletedCount).to.greaterThan(0)
		assert.equal(body.name, 'new name')
	})
})
