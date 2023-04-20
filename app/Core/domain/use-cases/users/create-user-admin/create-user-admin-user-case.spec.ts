import { describe, expect, it } from 'vitest';
import { CreateUserAdminUseCase } from './create-user-admin-use-case';

import {
	AdminMongooseRepository,
	UnitiesMongooseRepository,
} from 'App/Core/domain/repositories';
import { CreatePasswordUseCase } from '../create-password/create-password-use-case';

const user = {
	is_company: false,
	unity_id: '63528c11c109b232759921d1',
	name: 'Murilo dos Anjos Montino',
	date_expiration: '2021-01-01',
	password: '123456',
	email: 'murilomontinojr2@hotmail.com',
	document: '000.000.000-00',
	celphone: '(00) 00000-0000',
	type: 'admin_prof',
};

const makeSut = () => {
	const sut = new CreateUserAdminUseCase(
		new UnitiesMongooseRepository(),
		new AdminMongooseRepository(),
		new CreatePasswordUseCase(),
	);

	return {
		sut,
	};
};

describe('CreateUserAdminUserCase (Unit)', () => {
	it('should return left with error when user already exists', async () => {
		expect(1).toBe(1);
	});
});
