import { test } from '@japa/runner'
import Directmail from 'App/Models/Directmail'
import { assert } from 'chai'
import { loginAndGetToken } from '../helpers/login'

const data = {
	name: 'test',
	unity_id: '63528c11c109b232759921d1',
	prof: {
		value: '123456',
		label: '123456',
	},
	description: 'teste directmail',
}
test.group('Direct Mail Controller', async () => {
	test('display index directMail', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client
			.get('direct-mails?name=myUnity')
			.headers({ Authorization: `Bearer ${token.token}` })
		response.assertStatus(200)
		assert.isArray(response.body())
	})
	test('display store directMail', async ({ client }) => {
		const { token } = await loginAndGetToken(client)
		const response = await client
			.post('direct-mails')
			.json({
				...data,
			})
			.bearerToken(token.token)
		response.assertStatus(200)

		const { deletedCount } = await Directmail.deleteOne({
			_id: response.body()._id,
		})
		assert.equal(deletedCount, 1)
	})
	test('display destroy directMail', async ({ client }) => {
		const { token } = await loginAndGetToken(client)
		const directMail = await Directmail.create({ ...data, active: true })
		const response = await client
			.delete(`direct-mails/${directMail._id}`)
			.bearerToken(token.token)
		response.assertStatus(200)
	})
	test('display show directMail', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client
			.get('direct-mails/636940f53924e995efb9408a')
			.bearerToken(token.token)
		response.assertStatus(200)
	})
	test('display update directMail', async ({ client }) => {
		const { token } = await loginAndGetToken(client)
		const directmails = await Directmail.create({ ...data, active: true })

		const updatedData = {
			...data,
			name: 'Atualizado',
		}
		const response = await client
			.put(`direct-mails/${directmails._id}`)
			.json({ ...updatedData })
			.bearerToken(token.token)
		response.assertStatus(200)
		const updatedMails = await Directmail.findById(directmails._id)

		assert.equal(updatedMails?.name, updatedData.name)

		const { deletedCount } = await Directmail.deleteOne({ _id: directmails._id })
		assert.equal(deletedCount, 1)
	}).skip()
})
