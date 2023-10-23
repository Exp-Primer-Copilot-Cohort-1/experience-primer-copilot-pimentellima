import mongoose from 'mongoose'
import { beforeAll, describe, expect, it } from 'vitest'

import { CensusUnitiesManagerContract } from '../interface/census-manager.interface'
import { CensusMongooseRepository } from './census-mongoose-repository'

const makeSut = () => {
	const sut: CensusUnitiesManagerContract = new CensusMongooseRepository()
	return {
		sut,
	}
}

describe('Census Mongoose Repository (Integration)', () => {
	beforeAll(async () => {
		await mongoose.connect(process.env.DB_CONNECTION_STRING as string)
	})

	it('should be find census activities by unity', async () => {
		const { sut } = makeSut()
		const resultOrErr = await sut.findCensusActivitiesOfScheduledByUnityOrProf(
			process.env.TEST_INTEGRATION_UNITY_ID as string,
			'2023-01-01',
			'2024-01-31',
		)

		expect(resultOrErr.isRight()).toBeTruthy()
	})

	it('should be count procedures by unity', async () => {
		const { sut } = makeSut()
		const resultOrErr = await sut.findCensusProcedureByUnityOrProf(
			process.env.TEST_INTEGRATION_UNITY_ID as string,
			'2023-06-01',
			'2024-07-31',
		)

		expect(resultOrErr.isRight()).toBeTruthy()
	})

	it('should be count procedures by unity and prof', async () => {
		const { sut } = makeSut()
		const resultOrErr = await sut.findCensusProcedureByUnityOrProf(
			process.env.TEST_INTEGRATION_UNITY_ID as string, // unity id
			'2023-01-01', // date start
			'2024-01-31', // date end
			process.env.TEST_INTEGRATION_USER_ID, // prof id
		)

		expect(resultOrErr.isRight()).toBeTruthy()
	})

	it('should be count healt insurances by unity', async () => {
		const { sut } = makeSut()
		const resultOrErr = await sut.findCensusHealthInsurancesByUnityOrProf(
			process.env.TEST_INTEGRATION_UNITY_ID as string,
			'2023-06-01',
			'2024-07-31',
		)

		expect(resultOrErr.isRight()).toBeTruthy()
	})

	it('should be count healt insurances by unity and prof', async () => {
		const { sut } = makeSut()
		const resultOrErr = await sut.findCensusHealthInsurancesByUnityOrProf(
			process.env.TEST_INTEGRATION_UNITY_ID as string, // unity id
			'2023-01-01', // date start
			'2024-01-31', // date end
			process.env.TEST_INTEGRATION_USER_ID, // prof id
		)

		expect(resultOrErr.isRight()).toBeTruthy()
	})

	it('should be media time activities by unity and prof', async () => {
		const { sut } = makeSut()
		const resultOrErr = await sut.findMediaTimeAttendanceByUnityOrProf(
			process.env.TEST_INTEGRATION_UNITY_ID as string,
			'2023-06-01',
			'2024-07-31',
			process.env.TEST_INTEGRATION_USER_ID, // prof id
		)

		expect(resultOrErr.isRight()).toBeTruthy()
	})
	it('should be media time activities by unity', async () => {
		const { sut } = makeSut()
		const resultOrErr = await sut.findMediaTimeAttendanceByUnityOrProf(
			process.env.TEST_INTEGRATION_UNITY_ID as string,
			'2023-06-01',
			'2024-07-31',
		)

		expect(resultOrErr.isRight()).toBeTruthy()
	})

	it('should be count actvities by prof', async () => {
		const { sut } = makeSut()
		const resultOrErr = await sut.findActivitiesOfProf(
			process.env.TEST_INTEGRATION_UNITY_ID as string,
			'2022-12-01',
			'2024-07-31',
			process.env.TEST_INTEGRATION_USER_ID as string, // prof id
		)

		expect(resultOrErr.isRight()).toBeTruthy()
	})
})
