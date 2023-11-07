import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { OptsQuery } from 'App/Core/domain/entities/helpers/opts-query'
import mongoose from 'mongoose'
import { ProceduresMongooseRepository } from './procedures-mongo-repository'

const makeSut = () => {
	const sut = new ProceduresMongooseRepository(new OptsQuery())
	const procedure_id = process.env.TEST_INTEGRATION_PROCEDURE_ID as string
	const health_insurance_id = process.env.TEST_INTEGRATION_HEALTH_INSURANCE_ID as string


	return {
		sut,
		procedure_id,
		health_insurance_id
	}
}


describe('Procedure Mongo Repository (Integration)', () => {

	beforeAll(async () => {
		await mongoose.connect(process.env.DB_CONNECTION_STRING as string)
	})

	afterAll(async () => {
		await mongoose.disconnect()
	})

	it('should be defined', () => {
		expect(ProceduresMongooseRepository).toBeDefined()
	})

	it.skip('should be able to find basic procedure', async () => {
		const { sut, health_insurance_id, procedure_id } = makeSut()
		const activitiesOrErr = await sut.findBasic(procedure_id, health_insurance_id)
		expect(activitiesOrErr.isRight()).toBeTruthy()
	})
})
