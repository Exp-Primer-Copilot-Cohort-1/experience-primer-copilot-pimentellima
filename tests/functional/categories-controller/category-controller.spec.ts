import { test } from '@japa/runner'
import Category from 'App/Models/Category'
import { assert } from 'chai'
import { loginAndGetToken } from '../helpers/login'

const data = {
	name: 'test',
	prof: {
		value: '63597857c109b232759921d9',
		label: 'MOISÉS RODRIGUES DE PAULA',
	},
	active: true,
	unity_id: '63528c11c109b232759921d1',
}
test.group('Category Controller', async () => {
	test('display index category ', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client.get('categories').bearerToken(token.token)

		response.assertStatus(200)
		assert.isArray(response.body())
	})
	test('display store category', async ({ client }) => {
		const { token } = await loginAndGetToken(client)
		const response = await client
			.post('categories')
			.json(data)
			.bearerToken(token.token)
		response.assertStatus(200)

		const { deletedCount } = await Category.deleteOne({
			_id: response.body()._id,
		})
		assert.equal(deletedCount, 1)
	})
	test('display update category', async ({ client }) => {
		const { token } = await loginAndGetToken(client)
		const category = await Category.create({ ...data })

		const updatedData = {
			...data,
			name: 'Atualizado',
		}
		const response = await client
			.put(`categories/${category._id}`)
			.json({ ...updatedData })
			.bearerToken(token.token)
		response.assertStatus(200)
		const updatedCategory = await Category.findById(category._id)

		assert.equal(updatedCategory?.name, updatedData.name)

		const { deletedCount } = await Category.deleteOne({ _id: category._id })
		assert.equal(deletedCount, 1)
	}).skip()
	test('display show category', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client
			.get('categories/6364fe48c109b232759921fe')
			.bearerToken(token.token)
		response.assertStatus(200)
	})
	test('display destroy category', async ({ client }) => {
		const { token } = await loginAndGetToken(client)
		const categories = await Category.create({ ...data, active: true })
		const response = await client
			.delete(`categories/${categories._id}`)
			.bearerToken(token.token)

		response.assertStatus(200)
	}).skip()
})
