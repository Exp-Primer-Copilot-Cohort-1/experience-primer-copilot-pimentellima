import { describe, expect, it } from 'vitest';

import { UnitNotFoundError } from 'App/Core/domain/errors/unit-not-found';
import { ProceduresInMemoryRepository } from 'App/Core/domain/repositories/produceres/procedures-in-memory-repository';
import { DeleteProceduresByIdUseCase } from './delete-procedures-by-id-use-case';

const makeSut = () => {
	const sut = new DeleteProceduresByIdUseCase(
		new ProceduresInMemoryRepository(),
	);

	return { sut };
};

describe('DeleteProceduresByIdUseCase (Unit)', () => {
	it('should return  if right', async () => {
		const { sut } = makeSut();
		const proceduresOrErr = await sut.execute({ id: 'idtest' });
		//		console.log(proceduresOrErr.extract());

		expect(proceduresOrErr.isRight()).toBeTruthy();
		expect(proceduresOrErr.extract()).toBeInstanceOf(Object);
	});
	it('should return UnitNotFoundError if left', async () => {
		const { sut } = makeSut();
		const proceduresOrErr = await sut.execute({ id: 'idtest5' });

		expect(proceduresOrErr.isLeft()).toBeTruthy();
		expect(proceduresOrErr.extract()).toBeInstanceOf(UnitNotFoundError);
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
