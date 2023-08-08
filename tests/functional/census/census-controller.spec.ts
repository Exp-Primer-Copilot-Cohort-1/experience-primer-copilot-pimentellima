import { test } from '@japa/runner'
import { loginAndGetToken } from '../helpers/login'

test.group('Census Controller', async () => {
	test('display indexHelthIsurance ', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client
			.get('censu/health-insurance')
			.bearerToken(token.token)

		response.assertStatus(200)
	})
	test('display indexActivitiesByDaysMonth ', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client
			.get('censu/activities-daysmonth')
			.bearerToken(token.token)

		response.assertStatus(200)
	})
	test('display indexPaymentsByForm ', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client
			.get('censu/payments-by-form')
			.bearerToken(token.token)

		response.assertStatus(200)
	})
	test('display indexActivitiesProfByPro ', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client
			.get('censu/activities-prof-by-prof')
			.bearerToken(token.token)

		response.assertStatus(200)
	})
	test('display indexPaymentsByPartner ', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client
			.get('censu/payments-by-partner')
			.bearerToken(token.token)

		response.assertStatus(200)
	})
	test('display indexPaymentsByProf ', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client
			.get('censu/payments-by-prof')
			.bearerToken(token.token)

		response.assertStatus(200)
	})
	test('display indexPaymentsParticipation ', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client
			.get('censu/payments-participation')
			.bearerToken(token.token)

		response.assertStatus(200)
	})
	test('display indexRevenuesActivities', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client
			.get('censu/revenues-activities')
			.bearerToken(token.token)

		response.assertStatus(200)
	})
})
