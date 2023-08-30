import { test } from '@japa/runner'
import PaymentParticipations from 'App/Models/PaymentParticipations'
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

test.group('PaymentProf Controller', () => {
	test('Find all payment_profs', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client
			.get('payment-participations')
			.bearerToken(token.token)
		response.assertStatus(200)
	})

	test('Create payment participations', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client
			.post('payment-participations')
			.json(paymentProf)
			.bearerToken(token.token)

		response.assertStatus(200)
		const prof_id: any = await PaymentParticipations.findOne({}, { _id: 1 })
		const updatedDocument = await PaymentParticipations.findOneAndUpdate(
			{ _id: prof_id },
			{
				$pull: {
					prices: { active: { $in: [true, false] } },
				},
			},
			{
				new: true,
			},
		)
	})

	test('Find payment_prof by id', async ({ client }) => {
		const { token } = await loginAndGetToken(client)
		const id = '643dce475ddb2027c73fd269'

		const response = await client
			.get(`payment-participations/${id}`)
			.bearerToken(token.token)
		response.assertStatus(200)
	})
})
