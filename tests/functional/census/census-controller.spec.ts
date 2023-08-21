import { test } from '@japa/runner'
import { loginAndGetToken } from '../helpers/login'

test.group('Census Controller', async () => {
	test('display indexHealthInsurance ', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client
			.get('census/health-insurances')
			.bearerToken(token.token)

		response.assertStatus(200)
	})
	test('display indexActivitiesByDaysMonth ', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client
			.get('census/activities-days-month')
			.bearerToken(token.token)

		response.assertStatus(200)
	})
	test('display indexPaymentsByForm ', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client
			.get('census/payments-by-forms')
			.bearerToken(token.token)

		response.assertStatus(200)
	})
	test('display indexActivitiesProfByPro ', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client
			.get('census/activities-prof-by-profs')
			.bearerToken(token.token)

		response.assertStatus(200)
	})
	test('display indexPaymentsByPartner ', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client
			.get('census/payments-by-partners')
			.bearerToken(token.token)

		response.assertStatus(200)
	})
	test('display indexPaymentsByProf ', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client
			.get('census/payments-by-profs')
			.bearerToken(token.token)

		response.assertStatus(200)
	})
	test('display indexPaymentsParticipation ', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client
			.get('census/payments-participations')
			.bearerToken(token.token)

		response.assertStatus(200)
	})
	test('display indexRevenuesActivities', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client
			.get('census/revenues-activities')
			.bearerToken(token.token)

		response.assertStatus(200)
	})
})
