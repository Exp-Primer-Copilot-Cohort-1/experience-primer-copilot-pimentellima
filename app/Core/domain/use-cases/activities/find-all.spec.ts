import { describe, expect, it } from 'vitest';
import { ActivityInMemoryRepository } from '../../repositories/activities/activity-in-memory-repository';
import { MissingParamsError } from '../../errors/missing-params';
import { faker } from '@faker-js/faker';
import { FindActivitiesByClientUseCase } from './find-activities-by-client-use-case';
import { FindActivitiesByProfUseCase } from './find-activities-by-prof-use-case';

describe('Find activities by client_id (Unit)', () => {
	it('should return activities', async () => {
		const unity_id = faker.random.numeric();
		const client_id_1 = '1';
		const client_id_2 = '2';
		const memoryRepo = new ActivityInMemoryRepository();
		memoryRepo.activities = [
			{ unity_id, client_id: client_id_1 },
			{ unity_id, client_id: client_id_1 },
			{ unity_id, client_id: client_id_2 },
		]
		const sut = new FindActivitiesByClientUseCase(memoryRepo);
		const respOrErr = await sut.execute({
            unity_id,
			client_id: client_id_1
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
	it('should return activities', async () => {
		const unity_id = faker.random.numeric();
		const prof_id_1 = '1';
		const prof_id_2 = '2';
		const memoryRepo = new ActivityInMemoryRepository();
		memoryRepo.activities = [
			{ unity_id, prof_id: prof_id_1 },
			{ unity_id, prof_id: prof_id_1 },
			{ unity_id, prod_id: prof_id_2 },
		]
		const sut = new FindActivitiesByProfUseCase(memoryRepo);
		const respOrErr = await sut.execute({
            unity_id,
			prof_id: prof_id_1
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