import { describe, expect, it } from 'vitest';
import { UnitiesInMemoryRepository } from '../../../repositories';
import { FindAllUnityByNameUseCase } from './find-all-unities-by-name-use-case';

const makeSut = () => {
	const sut = new FindAllUnityByNameUseCase(new UnitiesInMemoryRepository());

	return { sut };
};

describe('FindAllUnityByNameUseCase (Unit)', () => {
	it('should return array if right', async () => {
		const { sut } = makeSut();
		const unitiesOrErr = await sut.execute({ name: 'cara' });

		expect(unitiesOrErr.isRight()).toBeTruthy();
		expect(unitiesOrErr.extract()).toBeInstanceOf(Array);
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
