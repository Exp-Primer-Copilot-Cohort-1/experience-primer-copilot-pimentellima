import { test } from '@japa/runner'
import { assert } from 'chai'
import { loginAndGetToken } from '../helpers/login'

test.group('Health Insurance Controller', () => {
	test('display all health insurance', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client.get('health-insurance').bearerToken(token.token)

		response.assertStatus(200)
	})
	test('display all health insurance inactive', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client
			.get('health-insurance?active=false')
			.bearerToken(token.token)

		response.assertStatus(200)
	})

	test('display all health insurance name equal Convênio', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client
			.get('health-insurance?name=Convênio&active=false')
			.bearerToken(token.token)

		response.assertStatus(200)
	})

	test('display health insurance by id', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client
			.get('health-insurance/63597974c109b232759921dc')
			.bearerToken(token.token)

		response.assertStatus(200)
		const healthInsurance = response.body()

		assert.equal(healthInsurance._id, '63597974c109b232759921dc')
	})

	test('display health insurance by id invalid', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client.get('health-insurance/1').bearerToken(token.token)

		response.assertStatus(404)
	})
})
