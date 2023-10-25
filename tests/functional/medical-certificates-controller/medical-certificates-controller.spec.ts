import { test } from '@japa/runner'
import MedicalCertificate from 'App/Models/MedicalCertificate'
import { assert, expect } from 'chai'
import mongoose from 'mongoose'
import { loginAndGetToken } from '../helpers/login'
const id = new mongoose.Types.ObjectId('63528c11c109b232759921d2')
const data = {
	name: 'test',
	unity_id: '63528c11c109b232759921d1',
	prof: {
		value: '63528c11c109b232759921d2',
		label: '123456',
	},
	description: 'teste medicalCertificate',
}
test.group('Direct Mail Controller', async () => {
	test('display index medicalCertificate', async ({ client }) => {
		const { token } = await loginAndGetToken(client)

		const response = await client
			.get('medical-certificate?name=myUnity')
			.headers({ Authorization: `Bearer ${token.token}` })
		response.assertStatus(200)
		assert.isArray(response.body())
	})
	test('display store medicalCertificate', async ({ client }) => {
		const { token } = await loginAndGetToken(client)
		const response = await client
			.post('medical-certificate')
			.json({
				...data,
				description: 'teste',
			})
			.bearerToken(token.token)

		response.assertStatus(204 | 200)


		//console.log(response.body())
		const { deletedCount } = await MedicalCertificate.deleteMany({
			description: 'teste',
		})
		expect(deletedCount).to.be.greaterThan(0)
	})
	test('display destroy medicalCertificate', async ({ client }) => {
		const { token } = await loginAndGetToken(client)
		const medicalCertificate = await MedicalCertificate.create({
			...data,
			active: true,
			prof: id,
		})

		const response = await client
			.delete(`medical-certificate/${medicalCertificate._id}`)
			.bearerToken(token.token)
		//console.log(medicalCertificate._id)
		response.assertStatus(200)
	})
	test('display show medicalCertificate', async ({ client }) => {
		const { token } = await loginAndGetToken(client)
		const medicalCertificate = await MedicalCertificate.create({
			...data,
			active: true,
			name: 'show',
			prof: id,
		})

		const response = await client
			.get('medical-certificate/' + medicalCertificate._id)
			.bearerToken(token.token)
		response.assertStatus(200)
		const { deletedCount } = await MedicalCertificate.deleteMany({
			name: response.body().name,
		})
		expect(deletedCount).to.be.greaterThan(0)
	})
	test('display update medicalCertificate', async ({ client }) => {
		const { token } = await loginAndGetToken(client)
		const medicalCertificate = await MedicalCertificate.create({
			...data,
			active: true,
			prof: id,
		})

		const updatedData = {
			...data,
			name: 'Atualizado',
			_id: medicalCertificate._id,
			prof: id,
		}
		const response = await client
			.put('medical-certificate/' + medicalCertificate._id)
			.json({ ...updatedData })
			.bearerToken(token.token)

		response.assertStatus(204 | 200)


		const updatedMails = await MedicalCertificate.findById(medicalCertificate._id)

		assert.equal(updatedMails?.name, updatedData.name)

		const { deletedCount } = await MedicalCertificate.deleteOne({
			_id: medicalCertificate._id,
		})
		assert.equal(deletedCount, 1)
	})
})
