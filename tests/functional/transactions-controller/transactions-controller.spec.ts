import { test } from '@japa/runner'
import Transactions from 'App/Models/Transactions'
import { ITransaction } from 'App/Types/ITransaction'
import { assert, expect } from 'chai'
import { loginAndGetToken } from '../helpers/login'

const transaction: ITransaction = {
	unity_id: '6359660fc109b232759921d4',
	type: 'income',
	account: '6359660fc109b232759921d4',
	financial_category: '6359660fc109b232759921d4',
	prof: '6359660fc109b232759921d4',
	cost_center: '6359660fc109b232759921d4',
	date: new Date(),
	paymentForm: 'pix',
	amount: 100,
	installment: false,
	paid: true,
}

const procedure = {
	prof: '6501c4785048d0b42ec3f35d',
	procedures: [
		{
			_id: '65030df0bcb69cfa3f4ff06c',
			minutes: 60,
			color: '#121212',
			health_insurance: {
				value: '65030c8a16c9c699bf0f70c0',
				label: 'CONVÊNIO',
			},
			price: 150.0,
		},
	],
}

test.group('Transactions Controller', async () => {
	test('display index transactions', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client.get('transactions').bearerToken(token.token)

		response.assertStatus(200)
		assert.isArray(response.body())
	}).skip()

	test('display store transactions', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client
			.post('transactions')
			.json(transaction)
			.bearerToken(token.token)

		response.assertStatus(200 | 204)


		const { deletedCount } = await Transactions.deleteMany({
			financial_category: '6359660fc109b232759921d4',
		})

		expect(deletedCount).to.be.greaterThan(0)
	})

	test('display store transactions with installment', async ({ client }) => {
		await Transactions.deleteMany({
			financial_category: '6359660fc109b232759921d4',
		})

		const { token } = await loginAndGetToken(client)

		const response = await client
			.post('transactions')
			.json({
				...transaction,
				installments: 2,
				paymentForm: 'credit_card',
			})
			.bearerToken(token.token)

		response.assertStatus(204)

		const t: ITransaction = response.body()

		assert.isObject(t)

		const { deletedCount } = await Transactions.deleteMany({
			financial_category: '6359660fc109b232759921d4',
		})

		expect(deletedCount).to.be.greaterThan(0)
	})


	test('display store transactions with procedure', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const newTransaction = { ...transaction, ...procedure }

		const response = await client
			.post('transactions')
			.json(newTransaction)
			.bearerToken(token.token)

		if (response.status() !== 200) {
			response.assertStatus(204)
		} else {
			response.assertStatus(200)
		}

		const t: ITransaction = response.body()

		assert.isObject(t)

		assert.containsAllKeys(t, ['_id'])
		const { deletedCount } = await Transactions.deleteMany({
			financial_category: '6359660fc109b232759921d4',
		})

		expect(deletedCount).to.be.greaterThan(0)
	}).skip()
})
