import { describe, expect, it } from 'vitest';

import { ProceduresInMemoryRepository } from 'App/Core/domain/repositories/produceres/procedures-in-memory-repository';
import { FindAllProceduresByUnityUseCase } from './find-all-procedures-by-unity-use-case';

const makeSut = () => {
	const sut = new FindAllProceduresByUnityUseCase(
		new ProceduresInMemoryRepository(),
	);

	return { sut };
};

describe('FindAllproceduresByUnityUseCase (Unit)', () => {
	it('should return is left if unity_id is not provided', async () => {
		const { sut } = makeSut();
		const input = { name: 'cara' };
		const proceduresOrErr = await sut.execute(input as any);

		expect(proceduresOrErr.isLeft()).toBeTruthy();
	});
	it('should return array if right', async () => {
		const { sut } = makeSut();
		const input = { unity_id: 'unity_id' };
		const proceduresOrErr = await sut.execute(input);

		//	console.log(proceduresOrErr.extract());

		expect(proceduresOrErr.isRight()).toBeTruthy();
		//	expect(proceduresOrErr.extract()).toBeInstanceOf(Array);
	});

	it('should return is left', async () => {
		const { sut } = makeSut();
		const proceduresOrErr = await sut.execute({});

		expect(proceduresOrErr.isLeft()).toBeTruthy();
	});
	it('should return is left if is null', async () => {
		const { sut } = makeSut();
		const proceduresOrErr = await sut.execute(null as any);

		expect(proceduresOrErr.isLeft()).toBeTruthy();
	});
});
