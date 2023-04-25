import { describe, expect, it } from 'vitest';
import { ActivityInMemoryRepository } from '../../repositories/activities/activity-in-memory-repository';

import { FindAllActivitiesUseCase } from './find-all-activities-use-case';
import { MissingParamsError } from '../../errors/missing-params';

const makeSut = () => {
	const sut = new FindAllActivitiesUseCase(new ActivityInMemoryRepository());

	return { sut };
};

describe('Find all activities use case (Unit)', () => {
	it('should return activities by unity id', async () => {
		const { sut } = makeSut();
		const respOrErr = await sut.execute({
            unity_id: 'validUnityId'
        });

        expect(respOrErr.isRight()).toBeTruthy();
	});
    it('should return error', async () => {
		const { sut } = makeSut();
		const respOrErr = await sut.execute({
            unity_id: undefined as any
        });

        expect(respOrErr.isLeft()).toBeTruthy();
        expect(respOrErr.extract()).toBeInstanceOf(MissingParamsError)
	});
    it('should return error', async () => {
		const { sut } = makeSut();
		const respOrErr = await sut.execute(null as any);

        expect(respOrErr.isLeft()).toBeTruthy();
        expect(respOrErr.extract()).toBeInstanceOf(MissingParamsError)
	});

});
