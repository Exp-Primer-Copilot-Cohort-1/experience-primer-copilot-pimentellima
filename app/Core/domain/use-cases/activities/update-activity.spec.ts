import { describe, expect, it } from 'vitest';
import { ActivityInMemoryRepository } from '../../repositories/activities/activity-in-memory-repository';
import { faker } from '@faker-js/faker';
import { UpdateActivityUseCase } from './update-activity-use-case';
import { ConflictingScheduleError } from '../../errors/ conflicting-schedule-error';

const activityDate = faker.date.future();

const activity = {
    _id: '1',
    date: activityDate,
    hour_start: new Date(activityDate.getHours() + 1),
    hour_end: new Date(activityDate.getHours() + 2),
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
}

describe('Update activity (Unit)', () => {
	it('should update activity active attribute', async () => {
        const repo = new ActivityInMemoryRepository()
        repo.activities = [activity];
		const sut = new UpdateActivityUseCase(repo);

        const updatedActivity = {
            ...activity,
            active: false
        };

        const query = {
            id: activity._id,
            activity: updatedActivity
        } as any;

		const respOrErr = await sut.execute(query);
        if(respOrErr.isLeft()) throw Error();
        expect(respOrErr.extract().active).toBe(false);
	});

    it('should change activity status to rescheduled', async () => {
        const repo = new ActivityInMemoryRepository()
        repo.activities = [activity];
		const sut = new UpdateActivityUseCase(repo);
        
        const updatedActivity = {
            ...activity,
            hour_end: new Date(activity.hour_end.getHours() + 1)
        }

        const query = {
            id: activity._id,
            activity: updatedActivity
        } as any;

		const respOrErr = await sut.execute(query);
        if(respOrErr.isLeft()) {
            console.log(respOrErr.extract())
            throw Error();
        } 
        expect(respOrErr.extract().status).toBe('rescheduled');
	});

    it('should throw conflicting schedule error', async () => {
        const repo = new ActivityInMemoryRepository();

        const date = faker.date.future();
        const otherActivity = {
            ...activity,
            _id: '2',
            hour_start: new Date(date.getHours() + 1),
            hour_end: new Date(date.getHours() + 2),
        };
        repo.activities = [activity, otherActivity]
        const sut = new UpdateActivityUseCase(repo);

        const updatedActivity = {
            ...otherActivity,
            date: activity.date,
            hour_start: activity.hour_start,
            hour_end: activity.hour_end
        }

        const query = {
            id: otherActivity._id,
            activity: updatedActivity
        } as any;

		const respOrErr = await sut.execute(query);
        expect(respOrErr.isLeft()).toBeTruthy();
        expect(respOrErr.extract()).toBeInstanceOf(ConflictingScheduleError);
	});

    it('should not change activity status', async () => {
        const repo = new ActivityInMemoryRepository()
        repo.activities = [activity];
		const sut = new UpdateActivityUseCase(repo);
        
        const updatedActivity = {
            ...activity,
        }

        const query = {
            id: activity._id,
            activity: updatedActivity
        } as any;

		const respOrErr = await sut.execute(query);
        if(respOrErr.isLeft()) throw Error();
        expect(respOrErr.extract().status).toBe(activity.status);
	});

});
