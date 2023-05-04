import { describe, expect, it } from 'vitest';
import { ActivityInMemoryRepository } from '../../repositories/activities/activity-in-memory-repository';
import { CreateActivityUseCase } from './create-activity-use-case';
import { ConflictingScheduleError } from '../../errors/ conflicting-schedule-error';
import { faker } from '@faker-js/faker';
import { InvalidScheduleError } from '../../errors/invalid-schedule-error';

const prototypeActivity = {
    date: '2023-04-26T03:00:00.000Z',
    hour_start: '2023-04-26T11:00:00.000Z',
    hour_end: '2023-04-26T12:00:00.000Z',
    status: 'scheduled',
    schedule_block: false,
    procedures: [
        {
            value: '6359965bc109b232759921e3',
            label: 'SESSÃO FISIOTERAPIA ',
            minutes: 60,
            color: '#b452e7',
            val: 160,
            health_insurance: {
                value: '63597974c109b232759921dc',
                label: 'PARTICULAR',
                price: 160
            },
            status: 'PAGO'
        }
    ],
    client: {
        value: '6399e196373d349c09b46dba',
        label: 'Wesley de Paula Pedra',
        celphone: '(31) 9 9937-9196',
        email: 'wesley de paula pedra',
        partner: null
    },
    obs: null,
    prof: {
        value: '635978cec109b232759921da',
        label: 'RAYSSA CRISTINA LOURES SILVA'
    },
    phone: null,
    all_day: false,
    is_recorrent: false,
    active: true,
    unity_id: '63528c11c109b232759921d1',
    user_id: '635978cec109b232759921da',
    scheduled: 'scheduled',
    prof_id: '635978cec109b232759921da',
    created_at: '2023-04-26T14:40:15.161Z',
    updated_at: '2023-04-26T17:51:20.526Z',
    paid: true
}


describe('Create activity (Unit)', () => {
	it('should display activity', async () => {
		const sut = new CreateActivityUseCase(new ActivityInMemoryRepository());

        const date = faker.date.future();
        const hour_start = faker.date.future();
        const hour_end = faker.date.future();
        const activityWithValidDates = {
            ...prototypeActivity,
            date,
            hour_start,
            hour_end
        };

		const respOrErr = await sut.execute(activityWithValidDates as any);
        expect(respOrErr.isRight()).toBeTruthy();
	});

    it('should display invalid schedule error', async () => {
		const sut = new CreateActivityUseCase(new ActivityInMemoryRepository());
		const respOrErr = await sut.execute({
            ...prototypeActivity,
            date: faker.date.past(),
            hour_start: faker.date.past(),
            hour_end: faker.date.past()
        } as any);

        expect(respOrErr.isLeft()).toBeTruthy();
        expect(respOrErr.extract()).toBeInstanceOf(InvalidScheduleError);
	});

    it('should display conflicting schedule error'), async() => {
        const activity = {
            ...prototypeActivity,
            date: faker.date.future(),
            hour_start: faker.date.future(),
            hour_end: faker.date.future()
        }

        const memoryRepo = new ActivityInMemoryRepository();
        memoryRepo.activities = [activity]
        const sut = new CreateActivityUseCase(new ActivityInMemoryRepository());

		const respOrErr = await sut.execute(activity as any);

        expect(respOrErr.isLeft()).toBeTruthy();
        expect(respOrErr.extract()).toBeInstanceOf(ConflictingScheduleError);
    }
});
