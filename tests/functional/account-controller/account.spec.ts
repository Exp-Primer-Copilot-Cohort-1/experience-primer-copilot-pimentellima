import { faker } from '@faker-js/faker'
import { test } from '@japa/runner'
import Account from 'App/Models/Account'
import { expect } from 'chai'
import { loginAndGetToken } from '../helpers/login'

const fabricAccount = () => ({
	name: faker.person.fullName(),
	cash: 0,
	date: faker.date.future(),
	bank: 'TESTES BANK',
	active: true,
})

const deleteMany = async () => {
	return Account.deleteMany({
		bank: 'TESTES BANK',
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

		const newAccount = fabricAccount()

		const { token } = await loginAndGetToken(client)

		const response = await client
			.post('accounts')
			.json(newAccount)
			.bearerToken(token.token)

		response.assertStatus(200 | 204)
		await deleteMany()

	}).skip()

	test('display account by id', async ({ client }) => {
		const newAccount = fabricAccount()
		const { token } = await loginAndGetToken(client)

		const account = await Account.create({
			...newAccount,
			unity_id: process.env.TEST_INTEGRATION_UNITY_ID as string
		})

		const response = await client.get('accounts/' + account._id.toString()).bearerToken(token.token)
		response.assertStatus(200)

		const { deletedCount } = await deleteMany()

		expect(deletedCount).to.greaterThan(0)
	})

	test('update account', async ({ client }) => {
		const newAccount = fabricAccount()

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
