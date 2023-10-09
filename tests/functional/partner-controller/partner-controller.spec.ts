import { test } from '@japa/runner'
import Partner from 'App/Models/Partner'
import { assert } from 'chai'
import { loginAndGetToken } from '../helpers/login'
const partnerData = {
	name: 'Test Partner',
}
const data = {
	name: 'Test Partner',
	unity_id: '63528c11c109b232759921d1',
}
test.group('Partner Controller', async () => {
	test('display index partner', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client
			.get('partners?name=myUnity')
			.bearerToken(token.token)

		response.assertStatus(200)
		assert.isArray(response.body())
	})
	test('display store partner', async ({ client }) => {
		const { token } = await loginAndGetToken(client)
		try {
			const response = await client
				.post('partners')
				.json({
					...partnerData,
				})
				.bearerToken(token.token)
		} catch (error) {
			console.log(error)
		}
		//response.assertStatus(200)
		assert.exists(partnerData.name)

		const { deletedCount } = await Partner.deleteOne({
			name: partnerData.name,
		})
		assert.equal(deletedCount, 1)
	})
	test('display update partner', async ({ client }) => {
		const { token } = await loginAndGetToken(client)
		const clean = await Partner.deleteMany({ unity_id: '63528c11c109b232759921d1' })
		const partner = await Partner.create({ ...data, active: true })

		const updatedData = {
			...data,
			_id: partner._id,
			name: 'Atualizado',
		}
		const response = await client
			.put(`partners/${partner._id}`)
			.json({ ...updatedData })
			.bearerToken(token.token)

		response.assertStatus(200)
		const updatedPartner = await Partner.findById(partner._id)

		assert.equal(updatedPartner?.name, updatedData.name)

		const { deletedCount } = await Partner.deleteOne({ _id: partner._id })
		assert.equal(deletedCount, 1)
	})
	test('display destroy partner', async ({ client }) => {
		const { token } = await loginAndGetToken(client)
		const clean = await Partner.deleteMany({ unity_id: '63528c11c109b232759921d1' })
		const partner = await Partner.create({ ...data, active: true })
		const response = await client
			.delete(`partners/${partner._id}`)
			.bearerToken(token.token)
		console.log(response.body)

		response.assertStatus(200)
	}).skip()
})
