import { test } from '@japa/runner'
import DefaultConfig from 'App/Models/DefaultConfig'
import { assert } from 'chai'
import { loginAndGetToken } from '../helpers/login'

const dataUp = {
	days: 2,
}
const data = {
	name: null,
	bank: [
		{
			value: '6390b598373d349c09b46d84',
			label: 'DR. PERFORMANCE IPATINGA',
		},
	],
	unity_id: '63528c11c109b232759921d1',
	days: 1,
	active: true,
}
test.group('DefaultConfig Controller', async () => {
	test('display index defaultConfig', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client
			.get('default-configs')
			.headers({ Authorization: `Bearer ${token.token}` })

		response.assertStatus(200)
		assert.isArray(response.body())
	})
	test('display store defaultConfig', async ({ client }) => {
		const { token } = await loginAndGetToken(client)
		const response = await client
			.post('default-configs')
			.json({
				...data,
			})
			.bearerToken(token.token)

		response.assertStatus(200)

		const { deletedCount } = await DefaultConfig.deleteOne({
			_id: response.body()._id,
		})
		assert.equal(deletedCount, 1)
	})
	test('display update defaultConfig', async ({ client }) => {
		const { token } = await loginAndGetToken(client)
		const configs = await DefaultConfig.create({ ...data })

		const updatedconfigs = {
			...data,
			days: 2,
		}
		const response = await client
			.put(`default-configs/${configs._id}`)
			.json({ ...updatedconfigs })
			.bearerToken(token.token)

		response.assertStatus(200)
		const updatedConfigs = await DefaultConfig.findById(configs._id)

		assert.equal(updatedConfigs?.days, updatedconfigs.days)

		const { deletedCount } = await DefaultConfig.deleteOne({ _id: configs._id })
		assert.equal(deletedCount, 1)
	})
	test('display destroy defaultConfig', async ({ client }) => {
		const { token } = await loginAndGetToken(client)
		const defaultConfig = await DefaultConfig.create({ ...data, active: true })
		const response = await client
			.delete(`default-configs/${defaultConfig._id}`)
			.bearerToken(token.token)
		response.assertStatus(200)
	})
	test('display show defaltConfig', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client
			.get('default-configs/642f1244d0e3bb29c2463982')
			.bearerToken(token.token)

		response.assertStatus(200)
	})
})
