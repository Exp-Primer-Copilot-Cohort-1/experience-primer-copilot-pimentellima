import { describe, expect, it } from 'vitest';

import { UnityValidationUseCase } from './unity-validation-use-case';

const makeSut = () => {
	const sut = new UnityValidationUseCase();

	return { sut };
};

describe('Unity Validations (Unit)', () => {
	it('should be invalid when unity is null', async () => {
		const { sut } = makeSut();
		const respOrErr = await sut.execute(null as any);

		expect(respOrErr.isLeft()).toBe(true);
	});

	it('should be invalid when unity is undefined', async () => {
		const { sut } = makeSut();
		const respOrErr = await sut.execute(undefined as any);

		expect(respOrErr.isLeft()).toBe(true);
	});

	// Testar com uma data do passado mockada
});
