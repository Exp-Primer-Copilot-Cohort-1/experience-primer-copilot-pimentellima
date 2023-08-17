import { faker } from '@faker-js/faker'
import { test } from '@japa/runner'
import Activity from 'App/Models/Activity'
import { assert } from 'chai'
import { loginAndGetToken } from '../helpers/login'
import { makeValidActivity } from '../helpers/makeValidActivity'

test.group('Activity Controller', () => {
	test('display all activities', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client.get('activity').bearerToken(token.token)

		response.assertStatus(200)
	})

	test('create activity', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const { _id, ...activity } = makeValidActivity()
		const response = await client
			.post('activity')
			.json(activity)
			.bearerToken(token.token)

		//const { deleted } = await Activity.deleteMany({ obs: response.body().obs })
		const { deletedCount } = await Activity.deleteOne({ _id: response.body()._id })
		assert.equal(deletedCount, 1)
	}).skip()

	test('display invalid date error', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const activity = makeValidActivity()
		const response = await client
			.post('activity')
			.json({
				...activity,
				date: faker.date.future(),
				hour_start: faker.date.future(),
				hour_end: faker.date.past(),
			})
			.bearerToken(token.token)
		console.log(response.body())
		response.assertStatus(409)
	}).skip()

	test('update activity', async ({ client }) => {
		const { token } = await loginAndGetToken(client)
		const { ...activity } = makeValidActivity()
		const activit = await Activity.create({ ...activity })

		const response = await client
			.put(`activity/${activit._id}`)
			.json({})
			.bearerToken(token.token)
		console.log(response.body())
		response.assertStatus(200)
	}).skip()

	test('display all activities by prof_id', async ({ client }) => {
		const prof_id = '6359660fc109b232759921d6'

		const { token } = await loginAndGetToken(client)

		const response = await client
			.get('activity/prof/' + prof_id)
			.bearerToken(token.token)

		response.assertStatus(200)
	})

	test('display all activities by client_id', async ({ client }) => {
		const client_id = '635996b3c109b232759921e5'

		const { token } = await loginAndGetToken(client)

		const response = await client
			.get('activity/client/' + client_id)
			.bearerToken(token.token)

		response.assertStatus(200)
	})

	test('display activity by id', async ({ client }) => {
		const id = '6462a77533efee1a647dd9cf'

		const response = await client.get(`activity/single/${id}`)
		response.assertStatus(200)
	}).skip()

	test('display activity not found', async ({ client }) => {
		const id = '64402e93c07ee00a53234fe0'

		const response = await client.get('activity/' + id)

		response.assertStatus(404)
	})
})
