import { faker } from '@faker-js/faker'
import { describe, expect, it } from 'vitest'
import { ActivityNotFoundError } from '../../errors/activity-not-found'
import { ActivityInMemoryRepository } from '../../repositories/activities/activity-in-memory-repository'
import { FindActivityByIdUseCase } from './find-activity-by-id-use-case'

const date = faker.date.future()

const activity = {
	_id: '1',
	date: date,
	hour_start: new Date(date.getHours() + 1),
	hour_end: new Date(date.getHours() + 2),
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
				price: 160,
			},
			status: 'PAGO',
		},
	],
	client: {
		value: '6399e196373d349c09b46dba',
		label: 'Wesley de Paula Pedra',
		celphone: '(31) 9 9937-9196',
		email: 'wesley de paula pedra',
		partner: null,
	},
	obs: null,
	prof: {
		value: '635978cec109b232759921da',
		label: 'RAYSSA CRISTINA LOURES SILVA',
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

describe.skip('Find activity (Unit)', () => {
	it('should find activity', async () => {
		const memoryRepo = new ActivityInMemoryRepository()
		memoryRepo.activities = [activity]
		const sut = new FindActivityByIdUseCase(memoryRepo)
		const query = {
			id: '1',
		} as any

		const respOrErr = await sut.execute(query)
		expect(respOrErr.isRight()).toBeTruthy()
	})

	it('should throw activity not found error', async () => {
		const memoryRepo = new ActivityInMemoryRepository()
		memoryRepo.activities = [activity]
		const sut = new FindActivityByIdUseCase(memoryRepo)
		const query = {
			id: '10',
		} as any

		const respOrErr = await sut.execute(query)
		expect(respOrErr.isLeft()).toBeTruthy()
		expect(respOrErr.extract()).toBeInstanceOf(ActivityNotFoundError)
	})
})
