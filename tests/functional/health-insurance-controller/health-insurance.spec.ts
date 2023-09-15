import { faker } from '@faker-js/faker'
import { test } from '@japa/runner'
import HealthInsurance from 'App/Models/HealthInsurance'
import { assert, expect } from 'chai'
import { loginAndGetToken } from '../helpers/login'

const healthInsurance = (unity_id) => ({
	name: 'teste',
	register_code: faker.string.numeric(),
	carence: Number(faker.string.numeric()),
	unity_id: unity_id,
	profs: [],
})

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
		const { token, user } = await loginAndGetToken(client)
		const healthInsurance = await HealthInsurance.create({
			name: 'find',
			register_code: faker.string.numeric(),
			carence: faker.string.numeric(),
			unity_id: user.unity_id,
		})

		const response = await client
			.get('health-insurance/' + healthInsurance._id)
			.bearerToken(token.token)

		response.assertStatus(200)
		const { deletedCount } = await HealthInsurance.deleteOne({
			name: healthInsurance.name,
		})
		expect(deletedCount).to.greaterThan(0)
	})
	test('display find health insurance by id invalid', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client.get('health-insurance/1').bearerToken(token.token)

		response.assertStatus(404)
	})
	test('display update health insurance by id', async ({ client }) => {
		const name = faker.person.firstName()
		const { token, user } = await loginAndGetToken(client)

		const item = healthInsurance(user.unity_id)
		const health = await HealthInsurance.create(item)

		const response = await client
			.put(`health-insurance/${health._id}`)
			.bearerToken(token.token)
			.json({
				name,
			})
			.send()

		response.assertStatus(200)
		const data = response.body()
		assert.equal(data.name, name)

		const { deletedCount } = await HealthInsurance.deleteOne({
			name: data.name,
		})
		expect(deletedCount).to.greaterThan(0)
	}).skip()
	test('display delete health insurance', async ({ client }) => {
		const { token, user } = await loginAndGetToken(client)

		const healthInsurance = await HealthInsurance.create({
			name: faker.person.firstName(),
			register_code: faker.string.numeric(),
			carence: faker.string.numeric(),
			unity_id: user.unity_id,
		})

		const response = await client
			.delete(`health-insurance/${healthInsurance._id}`)
			.bearerToken(token.token)
			.send()

		if (response.status() !== 200) {
			response.assertStatus(204)
		} else {
			response.assertStatus(200)
		}
	})
	test('display create health insurance', async ({ client }) => {
		const { token, user } = await loginAndGetToken(client)

		try {
			const response = await client
				.post('health-insurance')
				.bearerToken(token.token)
				.json(healthInsurance(user.unity_id))
				.send()
		} catch (error) {
			console.log(error)
		}
		assert.exists(user._id)

		const { deletedCount } = await HealthInsurance.deleteOne({
			name: 'teste',
		})
		assert.equal(deletedCount, 1)
		//	expect(deletedCount).to.greaterThan(0)
	})
})
