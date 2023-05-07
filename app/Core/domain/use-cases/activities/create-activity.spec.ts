import { describe, expect, it } from 'vitest';
import { ActivityInMemoryRepository } from '../../repositories/activities/activity-in-memory-repository';
import { CreateActivityUseCase } from './create-activity-use-case';
import { ConflictingScheduleError } from '../../errors/ conflicting-schedule-error';
import { faker } from '@faker-js/faker';
import { InvalidScheduleError } from '../../errors/invalid-schedule-error';
import { makeValidActivity } from 'tests/functional/helpers/makeValidActivity';


describe('Create activity (Unit)', () => {
	it('should create activity', async () => {
        const sut = new CreateActivityUseCase(new ActivityInMemoryRepository());
		const respOrErr = await sut.execute(makeValidActivity() as any);
        expect(respOrErr.isRight()).toBeTruthy();
	});

    it('should throw invalid schedule error', async () => {
		const sut = new CreateActivityUseCase(new ActivityInMemoryRepository());
		const validActivity = makeValidActivity();

		const respOrErr = await sut.execute({
            ...validActivity,
            date: faker.date.past(),
            hour_start: faker.date.past(),
            hour_end: faker.date.past()
        } as any);

        expect(respOrErr.isLeft()).toBeTruthy();
        expect(respOrErr.extract()).toBeInstanceOf(InvalidScheduleError);
	});

    it('should throw conflicting schedule error'), async() => {
        const memoryRepo = new ActivityInMemoryRepository();
		const validActivity = makeValidActivity();
        memoryRepo.activities = [validActivity]
        const sut = new CreateActivityUseCase(memoryRepo);
        const newActivity = {
            ...validActivity,
            _id: faker.random.alpha({ bannedChars: [validActivity._id] })
        };
		const respOrErr = await sut.execute(newActivity as any);

        expect(respOrErr.isLeft()).toBeTruthy();
        expect(respOrErr.extract()).toBeInstanceOf(ConflictingScheduleError);
    }
});
