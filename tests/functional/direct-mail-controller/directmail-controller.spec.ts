import { test } from '@japa/runner'
import MedicalCertificate from 'App/Models/MedicalCertificate'
import { assert } from 'chai'
import { loginAndGetToken } from '../helpers/login'

const data = {
	name: 'test',
	unity_id: '63528c11c109b232759921d1',
	prof: {
		value: '123456',
		label: '123456',
	},
	description: 'teste medicalCertificate',
}
test.group('Direct Mail Controller', async () => {
	test('display index medicalCertificate', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client
			.get('direct-mails?name=myUnity')
			.headers({ Authorization: `Bearer ${token.token}` })
		response.assertStatus(200)
		assert.isArray(response.body())
	}).skip()
	test('display store medicalCertificate', async ({ client }) => {
		const { token } = await loginAndGetToken(client)
		const response = await client
			.post('direct-mails')
			.json({
				...data,
			})
			.bearerToken(token.token)
		response.assertStatus(200)

		const { deletedCount } = await MedicalCertificate.deleteOne({
			_id: response.body()._id,
		})
		assert.equal(deletedCount, 1)
	}).skip()
	test('display destroy medicalCertificate', async ({ client }) => {
		const { token } = await loginAndGetToken(client)
		const medicalCertificate = await MedicalCertificate.create({ ...data, active: true })
		const response = await client
			.delete(`direct-mails/${medicalCertificate._id}`)
			.bearerToken(token.token)
		response.assertStatus(200)
	}).skip()
	test('display show medicalCertificate', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client
			.get('direct-mails/636940f53924e995efb9408a')
			.bearerToken(token.token)
		response.assertStatus(200)
	}).skip()
	test('display update medicalCertificate', async ({ client }) => {
		const { token } = await loginAndGetToken(client)
		const medicalCertificate = await MedicalCertificate.create({ ...data, active: true })

		const updatedData = {
			...data,
			name: 'Atualizado',
		}
		const response = await client
			.put(`direct-mails/${medicalCertificate._id}`)
			.json({ ...updatedData })
			.bearerToken(token.token)
		response.assertStatus(200)
		const updatedMails = await MedicalCertificate.findById(medicalCertificate._id)

		assert.equal(updatedMails?.name, updatedData.name)

		const { deletedCount } = await MedicalCertificate.deleteOne({ _id: medicalCertificate._id })
		assert.equal(deletedCount, 1)
	}).skip()
})
