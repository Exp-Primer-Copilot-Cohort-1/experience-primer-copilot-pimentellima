import { test } from '@japa/runner'
import PaymentParticipations from 'App/Models/PaymentParticipations'
import { expect } from 'chai'
import { loginAndGetToken } from '../helpers/login'

const paymentProf = {
	value: 0,
	percent: 0,
	procedure: {
		label: 'TESTE',
		value: '6359962cc109b232759921e1',
	},
	health_insurance: {
		label: 'TESTE',
		value: '63597974c109b232759921dc',
	},
	prof: {
		label: 'TESTE',
		value: '63597857c109b232759921d9',
	},
	active: false,
}

const deleteMany = async () => {
	return await PaymentParticipations.deleteMany({
		prof: {
			'$in': ['63597857c109b232759921d9'],
		},
		health_insurance: {
			'$in': ['63597974c109b232759921dc'],
		},
		procedure: {
			'$in': ['6359962cc109b232759921e1'],
		},
	})
}

test.group('PaymentProf Controller', () => {
	test('Find all payment_profs', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client
			.get('payment-participations')
			.bearerToken(token.token)

		response.assertStatus(200)
	})

	test('Create payment participations', async ({ client }) => {
		await deleteMany()
		const { token } = await loginAndGetToken(client)

		const response = await client
			.post('payment-participations')
			.json(paymentProf)
			.bearerToken(token.token)

		response.assertStatus(204 | 200)

		const { deletedCount } = await deleteMany()
		expect(deletedCount).to.greaterThan(0)
	})
})
