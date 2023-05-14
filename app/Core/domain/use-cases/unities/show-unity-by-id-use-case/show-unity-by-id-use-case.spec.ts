import { UnitNotFoundError } from 'App/Core/domain/errors/unit-not-found';
import { describe, expect, it } from 'vitest';
import { UnitiesInMemoryRepository } from '../../../repositories';
import { ShowUnityByIdUseCase } from './show-unity-by-id-use-case';

const makeSut = () => {
	const sut = new ShowUnityByIdUseCase(new UnitiesInMemoryRepository());

	return { sut };
};

describe('ShowUnityByIdUseCase (Unit)', () => {
	it('should return UnitNotFoundError if left', async () => {
		const { sut } = makeSut();
		const unitiesOrErr = await sut.execute({ id: 'id_inexistente' });

		expect(unitiesOrErr.isLeft()).toBeTruthy();
		expect(unitiesOrErr.extract()).toBeInstanceOf(UnitNotFoundError);
	});
	it('should return right', async () => {
		const { sut } = makeSut();

		const unitiesOrErr = await sut.execute({ id: 'idtest' });

		expect(unitiesOrErr.isRight()).toBeTruthy();
	});

	it('should return is left', async () => {
		const { sut } = makeSut();
		const unitiesOrErr = await sut.execute({});

		expect(unitiesOrErr.isLeft()).toBeTruthy();
	});

	it('should return is left if is null', async () => {
		const { sut } = makeSut();
		const unitiesOrErr = await sut.execute(null as any);

		expect(unitiesOrErr.isLeft()).toBeTruthy();
	});
});
