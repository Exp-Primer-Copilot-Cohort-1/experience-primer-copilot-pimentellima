import { TypeForms } from 'App/Types/IBusinessFranchises';
import mongoose from 'mongoose';
import { beforeAll, describe, expect, it } from "vitest";
import { RFormSFMongooseManager } from './reply-form-standard-franchise-mongoose-repository';

const makeSut = () => {
	const sut = new RFormSFMongooseManager()
	return {
		sut,
	}
}

describe('Reply Form Standard Franchise Repository (Integration)', () => {
	beforeAll(async () => {
		await mongoose.connect(process.env.DB_CONNECTION_STRING as string)
	})

	// beforeAll(async () => {
	// 	vi.mock('App/Models/HealthInsurance', () => ({
	// 		__esModule: true,
	// 		default: Model,
	// 	}))
	// })

	it('should be able to find all replies by group id', async () => {
		const { sut } = makeSut()
		const resultOrErr = await sut.findAllByGroupId(
			process.env.TEST_INTEGRATION_GROUP_ID as string,
			TypeForms.START,
		)

		expect(resultOrErr.isRight()).toBeTruthy()
	})

	it.skip('should be able to find info this reply', async () => {
		const { sut } = makeSut()
		const resultOrErr = await sut.findInfoThisReply(
			process.env.TEST_INTEGRATION_GROUP_ID as string,
		)

		expect(resultOrErr.isRight()).toBeTruthy()
	})
});