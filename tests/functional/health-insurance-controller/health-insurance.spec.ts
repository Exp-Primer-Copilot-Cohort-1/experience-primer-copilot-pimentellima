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

		const response = await client.get('health-insurances').bearerToken(token.token)


		response.assertStatus(200)
	})
	test('display find all health insurance inactive', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client
			.get('health-insurances?active=false')
			.bearerToken(token.token)

		response.assertStatus(200)
	})
	test('display find all health insurance name equal Convênio', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client
			.get('health-insurances?name=Convênio&active=false')
			.bearerToken(token.token)

		response.assertStatus(200)
	})
	test('display find health insurance by id', async ({ client }) => {
		await HealthInsurance.deleteMany({
			name: 'find',
		})
		const { token, user } = await loginAndGetToken(client)
		const healthInsurance = await HealthInsurance.create({
			name: 'find',
			register_code: faker.string.numeric(),
			carence: faker.string.numeric(),
			unity_id: user.unity_id,
		})

		const response = await client
			.get('health-insurances/' + healthInsurance._id)
			.bearerToken(token.token)

		response.assertStatus(200)
		const { deletedCount } = await HealthInsurance.deleteOne({
			name: healthInsurance.name,
		})
		expect(deletedCount).to.greaterThan(0)
	})
	test('display find health insurance by id invalid', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client.get('health-insurances/1').bearerToken(token.token)

		response.assertStatus(404)
	})
	test('display update health insurance by id', async ({ client }) => {
		await HealthInsurance.deleteMany({
			unity_id: '652f062efe130421abf65b37',
		})
		const name = faker.person.firstName()
		const { token, user } = await loginAndGetToken(client)

		const item = healthInsurance(user.unity_id)
		const health = await HealthInsurance.create(item)

		const response = await client
			.put(`health-insurances/${health._id}`)
			.bearerToken(token.token)
			.json({
				name,
			})
			.send()
		response.assertStatus(200 | 204)

		const healthUpdated: any = await HealthInsurance.findById(health._id)

		assert.equal(healthUpdated.name, name)
		console.log(response.body())
		// assert.equal(data.name, name)

		const { deletedCount } = await HealthInsurance.deleteOne({
			name: name,
		})
		expect(deletedCount).to.greaterThan(0)
	})
	// test('display delete health insurance', async ({ client }) => {
	// 	const { token, user } = await loginAndGetToken(client)

	// 	const healthInsurance = await HealthInsurance.create({
	// 		name: faker.person.firstName(),
	// 		register_code: faker.string.numeric(),
	// 		carence: faker.string.numeric(),
	// 		unity_id: user.unity_id,
	// 	})

	// 	const response = await client
	// 		.delete(`health-insurance/${healthInsurance._id}`)
	// 		.bearerToken(token.token)
	// 		.send()

	// response.assertStatus(200 | 204)

	// }).skip()
	test('display create health insurance', async ({ client }) => {
		const { token, user } = await loginAndGetToken(client)

		try {
			const response = await client
				.post('health-insurances')
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
