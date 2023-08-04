import mongoose from 'mongoose'
import { beforeAll, describe, expect, it } from 'vitest'

import { CensusClientsManagerInterface } from '../interface/census-clients-manager.interface'
import { CensusClientsMongooseRepository } from './census-clients-mongoose-repository'

const makeSut = () => {
	const sut: CensusClientsManagerInterface = new CensusClientsMongooseRepository()
	return {
		sut,
	}
}

describe('Census Mongoose Repository (Integration)', () => {
	beforeAll(async () => {
		await mongoose.connect(process.env.DB_CONNECTION_STRING as string)
	})

	it('should be find census genrer client by unity', async () => {
		const { sut } = makeSut()
		const resultOrErr = await sut.findCesusGenrerClientByUnityOrProf(
			'6359660fc109b232759921d4',
			'2023-01-01',
			'2024-01-31',
		)

		expect(resultOrErr.isRight()).toBeTruthy()
	})

	it('should be find census genrer client by unity and prof', async () => {
		const { sut } = makeSut()
		const resultOrErr = await sut.findCesusGenrerClientByUnityOrProf(
			'6359660fc109b232759921d4', // unity id
			'2023-01-01', // date start
			'2024-01-31', // date end
			'6359660fc109b232759921d6', // prof id
		)

		expect(resultOrErr.isRight()).toBeTruthy()
	})

	it('should be count partners by unity', async () => {
		const { sut } = makeSut()
		const resultOrErr = await sut.findCensusPartnersByUnityOrProf(
			'6359660fc109b232759921d4',
			'2023-06-01',
			'2024-07-31',
		)

		expect(resultOrErr.isRight()).toBeTruthy()
	})

	it('should be count partners by unity and prof', async () => {
		const { sut } = makeSut()
		const resultOrErr = await sut.findCensusPartnersByUnityOrProf(
			'6359660fc109b232759921d4', // unity id
			'2023-01-01', // date start
			'2024-01-31', // date end
			'6359660fc109b232759921d6', // prof id
		)

		expect(resultOrErr.isRight()).toBeTruthy()
	})

	it('should be new and old clients by unity and prof in month', async () => {
		const { sut } = makeSut()
		const resultOrErr = await sut.findNewAndOldClientsByUnityOrProf(
			'6359660fc109b232759921d4',
			'2023-06-01',
			'2024-07-31',
			'6359660fc109b232759921d6', // prof id
		)

		expect(resultOrErr.isRight()).toBeTruthy()
	})
	it('should be new and old clients by unity in month', async () => {
		const { sut } = makeSut()
		const resultOrErr = await sut.findNewAndOldClientsByUnityOrProf(
			'6359660fc109b232759921d4',
			'2022-12-01',
			'2024-07-31',
		)

		expect(resultOrErr.isRight()).toBeTruthy()
	})
})
