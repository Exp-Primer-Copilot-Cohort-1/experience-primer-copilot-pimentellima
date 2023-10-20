import { test } from '@japa/runner'
import Form from 'App/Models/Form'
import { assert, expect } from 'chai'
import { loginAndGetToken } from '../helpers/login'

const newForm = {
	name: 'teste',
	unity_id: '63528c11c109b232759921d1',
	prof: {
		label: 'TESTE',
		value: '63597857c109b232759921d9',
	},
}

test.group('Form Controller', () => {
	test('display all forms', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client.get('forms').bearerToken(token.token)

		response.assertStatus(200)
	})
	test('display create form', async ({ client }) => {
		// await Form.deleteMany({ unity_id: '63528c11c109b232759921d1' })

		const { token } = await loginAndGetToken(client)

		const response = await client
			.post('forms')
			.json({
				...newForm,

			})
			.bearerToken(token.token)
		console.log(response.body())

		if (response.status() !== 200) {
			response.assertStatus(204)
		} else {
			response.assertStatus(200)
		}

		const { deletedCount } = await Form.deleteMany({ name: 'teste' })
		expect(deletedCount).to.greaterThan(0)
	})
	test('display form by id', async ({ client }) => {
		const { token } = await loginAndGetToken(client)
		const form = await Form.create({ ...newForm, active: true, name: 'find' })

		const response = await client.get(`forms/single/${form._id}`).bearerToken(token.token)

		response.assertStatus(200)
		const { deletedCount } = await Form.deleteMany({ name: 'find' })
		expect(deletedCount).to.greaterThan(0)
	})
	test('display update form', async ({ client }) => {
		const { token } = await loginAndGetToken(client)
		const form = await Form.create({ ...newForm, active: true })

		const updatedForm = {
			...newForm,
			name: 'Atualizado',
		}
		const response = await client
			.put(`forms/${form._id}`)
			.json({ ...updatedForm })
			.bearerToken(token.token)

		if (response.status() !== 200) {
			response.assertStatus(204)
		} else {
			response.assertStatus(200)
		}
		const updatedForms = await Form.findById(form._id)

		assert.equal(updatedForms?.name, updatedForm.name)
		const { deletedCount } = await Form.deleteMany({ name: 'Atualizado' })
		expect(deletedCount).to.greaterThan(0)

	})
})
