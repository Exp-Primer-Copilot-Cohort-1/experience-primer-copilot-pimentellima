import mongoose from 'mongoose'
import { beforeAll, describe, expect, it } from 'vitest'

import { CensusUnitiesManagerInterface } from '../interface/census-manager.interface'
import { CensusMongooseRepository } from './census-mongoose-repository'

const makeSut = () => {
	const sut: CensusUnitiesManagerInterface = new CensusMongooseRepository()
	return {
		sut,
	}
}

describe('Census Mongoose Repository (Integration)', () => {
	beforeAll(async () => {
		await mongoose.connect(
			'mongodb://admin:admin@localhost/admin?connectTimeoutMS=300000&retryWrites=true',
		)
	})

	it('should be find census activities by unity', async () => {
		const { sut } = makeSut()
		const resultOrErr = await sut.findCensusActivitiesOfScheduledByUnityOrProf(
			'6359660fc109b232759921d4',
			'2023-01-01',
			'2024-01-31',
		)

		expect(resultOrErr.isRight()).toBeTruthy()
	})

	it('should be count procedures by unity', async () => {
		const { sut } = makeSut()
		const resultOrErr = await sut.findCensusProcedureByUnityOrProf(
			'6359660fc109b232759921d4',
			'2023-06-01',
			'2024-07-31',
		)

		expect(resultOrErr.isRight()).toBeTruthy()
	})

	it('should be count procedures by unity and prof', async () => {
		const { sut } = makeSut()
		const resultOrErr = await sut.findCensusProcedureByUnityOrProf(
			'6359660fc109b232759921d4', // unity id
			'2023-01-01', // date start
			'2024-01-31', // date end
			'6359660fc109b232759921d6', // prof id
		)

		expect(resultOrErr.isRight()).toBeTruthy()
	})

	it('should be count healt insurances by unity', async () => {
		const { sut } = makeSut()
		const resultOrErr = await sut.findCensusHealthInsurancesByUnityOrProf(
			'6359660fc109b232759921d4',
			'2023-06-01',
			'2024-07-31',
		)

		expect(resultOrErr.isRight()).toBeTruthy()
	})

	it('should be count healt insurances by unity and prof', async () => {
		const { sut } = makeSut()
		const resultOrErr = await sut.findCensusHealthInsurancesByUnityOrProf(
			'6359660fc109b232759921d4', // unity id
			'2023-01-01', // date start
			'2024-01-31', // date end
			'6359660fc109b232759921d6', // prof id
		)

		expect(resultOrErr.isRight()).toBeTruthy()
	})

	it('should be media time activities by unity and prof', async () => {
		const { sut } = makeSut()
		const resultOrErr = await sut.findMediaTimeAttendanceByUnityOrProf(
			'6359660fc109b232759921d4',
			'2023-06-01',
			'2024-07-31',
			'6359660fc109b232759921d6', // prof id
		)

		expect(resultOrErr.isRight()).toBeTruthy()
	})
	it('should be media time activities by unity', async () => {
		const { sut } = makeSut()
		const resultOrErr = await sut.findMediaTimeAttendanceByUnityOrProf(
			'6359660fc109b232759921d4',
			'2023-06-01',
			'2024-07-31',
		)

		expect(resultOrErr.isRight()).toBeTruthy()
	})

	it('should be count actvities by prof', async () => {
		const { sut } = makeSut()
		const resultOrErr = await sut.findActivitiesOfProfByProfByUnity(
			'6359660fc109b232759921d4',
			'2022-12-01',
			'2024-07-31',
			'6359660fc109b232759921d6', // prof id
		)

		expect(resultOrErr.isRight()).toBeTruthy()
	})
})
