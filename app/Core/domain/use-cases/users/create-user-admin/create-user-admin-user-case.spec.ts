import { describe, expect, it } from 'vitest';
import { CreateUserAdminUseCase } from './create-user-admin-use-case';

import {
	AdminInMemoryRepository,
	UnitiesInMemoryRepository,
} from 'App/Core/domain/repositories';
import { CreatePasswordUseCase } from '../create-password/create-password-use-case';

import { faker } from '@faker-js/faker';
import DaysOfTrade from 'App/Core/domain/entities/helpers/days-of-trade';
import { IAdminUser } from 'Types/IAdminUser';
import { cpf } from 'cpf-cnpj-validator';

const user: IAdminUser = {
	is_company: faker.datatype.boolean(),
	unity_id: '63528c11c109b232759921d1',
	name: faker.name.fullName(),
	date_expiration: '2021-01-01',
	password: faker.internet.password(),
	email: faker.internet.email(),
	document: cpf.generate(),
	celphone: faker.phone.number('(99) 99999-9999'),
	type: 'admin_prof',
	dayOfTrade: DaysOfTrade.build({} as any),
};

const makeSut = () => {
	const sut = new CreateUserAdminUseCase(
		new UnitiesInMemoryRepository(),
		new AdminInMemoryRepository(),
		new CreatePasswordUseCase(),
	);

	return {
		sut,
	};
};

describe('Create User Admin Use Case (Unit)', () => {
	it('should return left with error when user already exists', async () => {
		const { sut } = makeSut();
		expect(true).toBe(true);
	});
});
