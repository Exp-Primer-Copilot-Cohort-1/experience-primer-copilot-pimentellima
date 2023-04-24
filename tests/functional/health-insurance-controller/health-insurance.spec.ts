import { faker } from '@faker-js/faker'
import { test } from '@japa/runner'
import HealthInsurance from 'App/Models/HealthInsurance'
import { assert } from 'chai'
import { loginAndGetToken } from '../helpers/login'

test.group('Health Insurance Controller', () => {
	test('display find all health insurance', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client.get('health-insurance').bearerToken(token.token)

		response.assertStatus(200)
	})
	test('display find all health insurance inactive', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client
			.get('health-insurance?active=false')
			.bearerToken(token.token)

		response.assertStatus(200)
	})
	test('display find all health insurance name equal Convênio', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client
			.get('health-insurance?name=Convênio&active=false')
			.bearerToken(token.token)

		response.assertStatus(200)
	})
	test('display find health insurance by id', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client
			.get('health-insurance/63597974c109b232759921dc')
			.bearerToken(token.token)

		response.assertStatus(200)
		const healthInsurance = response.body()

		assert.equal(healthInsurance._id, '63597974c109b232759921dc')
	})
	test('display find health insurance by id invalid', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client.get('health-insurance/1').bearerToken(token.token)

		response.assertStatus(404)
	})
	test('display update health insurance by id', async ({ client }) => {
		const name = faker.name.firstName()
		const { token } = await loginAndGetToken(client)

		const response = await client
			.put('health-insurance/63597974c109b232759921dc')
			.bearerToken(token.token)
			.json({
				name,
			})
			.send()

		response.assertStatus(200)
		const data = response.body()
		assert.equal(data.name, name)
	})
	test('display create health insurance', async ({ client }) => {
		const { token, user } = await loginAndGetToken(client)

		const response = await client
			.post('health-insurance')
			.bearerToken(token.token)
			.json({
				name: faker.name.firstName(),
				register_code: faker.random.numeric(),
				carence: faker.random.numeric(),
				unity_id: user.unity_id,
			})
			.send()

		if (response.status() !== 200) {
			console.log(response.error())
		}

		response.assertStatus(200)
		const data = response.body()
		assert.exists(data._id)

		const { deletedCount } = await HealthInsurance.deleteOne({ _id: data._id })

		assert.equal(deletedCount, 1)
	})
	test('display delete health insurance', async ({ client }) => {
		const { token, user } = await loginAndGetToken(client)

		const healthInsurance = await HealthInsurance.create({
			name: faker.name.firstName(),
			register_code: faker.random.numeric(),
			carence: faker.random.numeric(),
			unity_id: user.unity_id,
		})

		const response = await client
			.delete(`health-insurance/${healthInsurance._id}`)
			.bearerToken(token.token)
			.send()

		response.assertStatus(200)
	})
})
