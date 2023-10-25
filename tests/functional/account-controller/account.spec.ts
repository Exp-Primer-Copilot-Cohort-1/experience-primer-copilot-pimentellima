import { faker } from '@faker-js/faker'
import { test } from '@japa/runner'
import Account from 'App/Models/Account'
import { expect } from 'chai'
import { loginAndGetToken } from '../helpers/login'

import { Types } from '@ioc:Mongoose'
const { ObjectId } = Types

const newAccount = {
	name: faker.person.fullName(),
	cash: 0,
	date: faker.date.future(),
	bank: 'SANTANDER',
	active: true,
}

const deleteMany = async () => {
	return await Account.deleteMany({
		name: {
			'$in': [newAccount.name, 'new name'],
		},
	})
}

test.group('Account Controller', () => {
	test('display all accounts', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client.get('accounts').bearerToken(token.token)

		response.assertStatus(200)
	})

	test('create account', async ({ client }) => {
		await deleteMany()

		const { token } = await loginAndGetToken(client)

		const response = await client
			.post('accounts')
			.json(newAccount)
			.bearerToken(token.token)

		response.assertStatus(200 | 204)

		const { deletedCount } = await deleteMany()
		expect(deletedCount).to.greaterThan(0)
	})

	test('display account by id', async ({ client }) => {
		await deleteMany()
		const { token } = await loginAndGetToken(client)

		const account = await Account.create({
			...newAccount,
			unity_id: process.env.TEST_INTEGRATION_UNITY_ID as string
		})

		const id = account._id.toString()

		const response = await client.get('accounts/' + id).bearerToken(token.token)
		response.assertStatus(200)

		const { deletedCount } = await deleteMany()

		expect(deletedCount).to.greaterThan(0)
	})

	test('display account not found', async ({ client }) => {
		const { token } = await loginAndGetToken(client)
		const id = new ObjectId().toString()
		const response = await client.get('accounts/' + id).bearerToken(token.token)
		response.assertStatus(404 || 400)
	})

	test('update account', async ({ client }) => {
		await deleteMany()

		const account = await Account.create({
			...newAccount,
			unity_id: process.env.TEST_INTEGRATION_UNITY_ID as string
		})

		const { token } = await loginAndGetToken(client)
		const id = account._id.toString()

		const response = await client
			.put('accounts/' + id)
			.json({ name: 'new name' })
			.bearerToken(token.token)

		response.assertStatus(200 | 204)

		const { deletedCount } = await deleteMany()
		expect(deletedCount).to.greaterThan(0)
	})
})
