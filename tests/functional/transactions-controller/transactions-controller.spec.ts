import { test } from '@japa/runner'
import Transactions from 'App/Models/Transactions'
import { ITransaction } from 'App/Types/ITransaction'
import { assert } from 'chai'
import { loginAndGetToken } from '../helpers/login'

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
	total: 100,
	installment: false,
	paid: true,
}

const procedure = {
	prof: { value: '6359660fc109b232759921d6', label: 'RODRIGO MACHADO' },
	procedures: [
		{
			value: '64cfe7b52051b9be53a7055e',
			label: 'COM PRODUTOS',
			minutes: 60,
			color: '#121212',
			health_insurance: {
				value: '6363ca3ac109b232759921f3',
				label: 'CONVÊNIO',
			},
			price: '150,00',
		},
	],
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

	test('display store transactions with installment', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client
			.post('transactions')
			.json({
				...transaction,
				installments: 2,
				paymentForm: 'credit_card',
			})
			.bearerToken(token.token)

		response.assertStatus(200)

		const t: ITransaction = response.body()

		assert.isObject(t)

		assert.containsAllKeys(t, ['_id'])
		const { deletedCount } = await Transactions.deleteMany({
			'prof.label': 'MOISÉS RODRIGUES DE PAULA TESTE',
		})

		assert.equal(deletedCount, 4)
	})

	test('display store transactions with procedure', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const newTransaction = { ...transaction, ...procedure }

		const response = await client
			.post('transactions')
			.json(newTransaction)
			.bearerToken(token.token)

		response.assertStatus(200)

		const t: ITransaction = response.body()

		assert.isObject(t)

		assert.containsAllKeys(t, ['_id'])
		const { deletedCount } = await Transactions.deleteMany({
			_id: t._id,
		})

		assert.equal(deletedCount, 1)
	}).skip()
})
