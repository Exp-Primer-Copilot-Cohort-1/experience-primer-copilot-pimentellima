import { describe, expect, it } from 'vitest';
import { ActivityInMemoryRepository } from '../../repositories/activities/activity-in-memory-repository';
import { MissingParamsError } from '../../errors/missing-params';
import { FindActivitiesByClientUseCase } from './find-activities-by-client-use-case';
import { FindActivitiesByProfUseCase } from './find-activities-by-prof-use-case';

describe('Find all activities by client_id (Unit)', () => {
	it('should find all activities matching unity_id and client_id', async () => {
		const memoryRepo = new ActivityInMemoryRepository();
		memoryRepo.activities = [
			{ unity_id: '1', client_id: '1' },
			{ unity_id: '1', client_id: '1' },
			{ unity_id: '1', client_id: '2' },
			{ unity_id: '2', client_id: '1' },
		]
		const sut = new FindActivitiesByClientUseCase(memoryRepo);
		const respOrErr = await sut.execute({
            unity_id: '1',
			client_id: '1'
        });

        expect(respOrErr.isRight()).toBeTruthy();
		expect(respOrErr.extract()).toHaveLength(2)
	});

    it('should return missing params error', async () => {
		const memoryRepo = new ActivityInMemoryRepository();
		const sut = new FindActivitiesByClientUseCase(memoryRepo);
		const respOrErr = await sut.execute({
            unity_id: undefined as any,
			client_id: undefined as any
        });

        expect(respOrErr.isLeft()).toBeTruthy();
        expect(respOrErr.extract()).toBeInstanceOf(MissingParamsError)
	});
});

describe('Find activities by prof_id (Unit)', () => {
	it('should find all activities matching unity_id and prof_id', async () => {
		const memoryRepo = new ActivityInMemoryRepository();
		memoryRepo.activities = [
			{ unity_id: '1', prof_id: '1' },
			{ unity_id: '1', prof_id: '1' },
			{ unity_id: '2', prof_id: '1' },
			{ unity_id: '1', prod_id: '2' },
		]
		const sut = new FindActivitiesByProfUseCase(memoryRepo);
		const respOrErr = await sut.execute({
            unity_id: '1',
			prof_id: '1'
        });

        expect(respOrErr.isRight()).toBeTruthy();
		expect(respOrErr.extract()).toHaveLength(2)
	});

    it('should return missing params error', async () => {
		const memoryRepo = new ActivityInMemoryRepository();
		const sut = new FindActivitiesByProfUseCase(memoryRepo);
		const respOrErr = await sut.execute({
            unity_id: undefined as any,
			prof_id: undefined as any
        });

        expect(respOrErr.isLeft()).toBeTruthy();
        expect(respOrErr.extract()).toBeInstanceOf(MissingParamsError)
	});
});