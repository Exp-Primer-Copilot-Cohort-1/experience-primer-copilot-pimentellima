import { test } from '@japa/runner'

import Procedure from 'App/Models/Procedure'
import { assert } from 'chai'
import { loginAndGetToken } from '../helpers/login'
const procedureData = {
	value: 0,
	color: '#e0594b',
	name: 'teste',
	minutes: 50,
	prof: [
		{
			value: '63597857c109b232759921d9',
			label: 'MOISÉS RODRIGUES DE PAULA',
		},
	],
	health_insurance: [
		{
			value: '63597974c109b232759921dc',
			label: 'PARTICULAR',
			price: '260,00',
		},
	],
}
const proceduresData = {
	value: 0,
	color: '#e0594b',
	name: 'teste',
	minutes: 50,
	prof: [
		{
			value: '63597857c109b232759921d9',
			label: 'MOISÉS RODRIGUES DE PAULA',
		},
	],
	health_insurance: [
		{
			value: '63597974c109b232759921dc',
			label: 'PARTICULAR',
			price: '260,00',
		},
	],
	unity_id: '63528c11c109b232759921d1',
}

test.group('Procedure Controller', async () => {
	test('display index procedures ', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client
			.get('procedure')
			.headers({ Authorization: `Bearer ${token.token}` })
		response.assertStatus(200)
		assert.isArray(response.body())
	})
	test('display store procedure', async ({ client }) => {
		const { token } = await loginAndGetToken(client)
		const response = await client
			.post('procedure')
			.json({
				...procedureData,
			})
			.headers({ Authorization: `Bearer ${token.token}` })

		response.assertStatus(200)

		const { deletedCount } = await Procedure.deleteOne({
			_id: response.body()._id,
		})
		assert.equal(deletedCount, 1)
	})
	test('display update procedure', async ({ client }) => {
		const { token } = await loginAndGetToken(client)
		const procedure = await Procedure.create({ ...proceduresData, active: true })

		const updatedData = {
			...proceduresData,
			name: 'Nova Unidade',
		}
		const response = await client
			.put(`procedure/${procedure._id}`)
			.json({ ...updatedData })
			.headers({ Authorization: `Bearer ${token.token}` })
		response.assertStatus(200)
		const updatedProcedure = await Procedure.findById(procedure._id)

		assert.equal(updatedProcedure?.name, updatedData.name)

		const { deletedCount } = await Procedure.deleteOne({ _id: procedure._id })
		assert.equal(deletedCount, 1)
	})
	test('display delete procedure', async ({ client }) => {
		const { token } = await loginAndGetToken(client)
		const procedure = await Procedure.create({
			...proceduresData,
			active: true,
		})

		const response = await client
			.delete(`procedure/${procedure._id}`)
			.headers({ Authorization: `Bearer ${token.token}` })

		response.assertStatus(200)
	})
})
