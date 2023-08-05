import { test } from '@japa/runner'
import Transactions from 'App/Models/Transactions'
import { ITransaction } from 'Types/ITransaction'
import { assert } from 'chai'
import { loginAndGetToken } from '../helpers/login'

import { Types } from 'mongoose'

const ObjectId = Types.ObjectId

const transaction: ITransaction = {
	unity_id: '6359660fc109b232759921d4',
	type: 'income',
	bank: {
		value: '6359660fc109b232759921d4',
		label: 'Banco do Brasil',
	},
	category: {
		value: '6359660fc109b232759921d4',
		label: 'Salário',
	},
	prof: {
		value: '6359660fc109b232759921d4',
		label: 'MOISÉS RODRIGUES DE PAULA TESTE',
	},
	cost_center: {
		value: '6359660fc109b232759921d4',
		label: 'Salário',
	},
	date: new Date(),
	paymentForm: 'pix',
	value: 100,
	installment: false,
	paid: true,
}

test.group('Transactions Controller', async () => {
	test('display index transactions', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client.get('transactions').bearerToken(token.token)

		response.assertStatus(200)
		assert.isArray(response.body())
	})

	test('display store transactions', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client
			.post('transactions')
			.json(transaction)
			.bearerToken(token.token)

		response.assertStatus(200)

		const t: ITransaction = response.body()

		assert.isObject(t)

		assert.containsAllKeys(t, ['_id'])
		const { deletedCount } = await Transactions.deleteMany({
			'prof.label': 'MOISÉS RODRIGUES DE PAULA TESTE',
		})

		assert.equal(deletedCount, 2)
	})
})
