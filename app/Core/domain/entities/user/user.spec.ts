import { describe, expect, it } from 'vitest';

import { faker } from '@faker-js/faker';
import { IUser } from 'Types/IUser';
import User from './user';

const user = {
	_id: faker.datatype.uuid(),
	created_at: faker.date.past(),
	due_date: faker.date.future().toISOString(),
	name: faker.name.firstName(),
	email: faker.internet.email(),
	password: faker.internet.password(),
	active: faker.datatype.boolean(),
	avatar: faker.image.avatar(),
	exib_minutes: faker.datatype.number({ min: 1, max: 60 }),
	hour_end: faker.date.recent().toISOString(),
	hour_end_lunch: faker.date.recent().toISOString(),
	hour_start: faker.date.recent().toISOString(),
	hour_start_lunch: faker.date.recent().toISOString(),
	is_friday: faker.datatype.boolean(),
	is_monday: faker.datatype.boolean(),
	is_saturday: faker.datatype.boolean(),
	is_sunday: faker.datatype.boolean(),
	is_thursday: faker.datatype.boolean(),
	is_tuesday: faker.datatype.boolean(),
	is_wednesday: faker.datatype.boolean(),
	lunch_time_active: faker.datatype.boolean(),
	schedule_obs: faker.lorem.paragraph(),
	show_lack: faker.datatype.boolean(),
	type: 'prof',
	unity_id: faker.datatype.uuid(),
	updated_at: faker.date.recent(),
	rememberMeToken: faker.datatype.uuid(),
} as IUser;

describe('Entity User (Unit)', () => {
	it('should be able to create a new user', () => {
		const userEntity = User.build(user);

		expect(userEntity).toBeInstanceOf(User);
	});

	it('should be able to create a new user with params', () => {
		const userEntity = User.build(user);

		expect(userEntity.params()).toEqual(user);
	});

	it('should be invalid email when email is invalid', () => {
		const userEntity = User.build(user);

		expect(() => userEntity.defineEmail('invalid-email')).toThrow();
	});
});
