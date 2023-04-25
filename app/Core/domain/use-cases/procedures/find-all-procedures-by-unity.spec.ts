import mongoose from 'mongoose';
import { beforeAll, describe, expect, it } from 'vitest';
import { FindAllProceduresByUnityUseCase } from './find-all-procedures-by-unity';

const makeSut = () => {
	const sut = new FindAllProceduresByUnityUseCase();
	return { sut };
};

describe('Find All Procedures By Unity', () => {
	beforeAll(async () => {
		if (process.env.DB_CONNECTION_STRING) {
			mongoose.connect(process.env.DB_CONNECTION_STRING);
		}
	});
	it('should return all procedures by unity', async () => {
		const { sut } = makeSut();
		const proceduresOrErr = await sut.execute({ unity_id: 'any_unity_id' });

		expect(proceduresOrErr.isRight()).toBeTruthy();
		console.log(proceduresOrErr.extract());
	});
});
