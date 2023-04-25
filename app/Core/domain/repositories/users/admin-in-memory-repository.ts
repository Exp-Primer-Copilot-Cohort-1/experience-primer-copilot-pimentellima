import AdminEntity from 'App/Core/domain/entities/user/admin';
import { PromiseEither, left, right } from 'App/Core/shared/either';
import { AdminManagerInterface } from '../interface/admin-manager.interface';

import { faker } from '@faker-js/faker';
import { AbstractError } from 'App/Core/errors/error.interface';
import { UserNotFoundError } from '../../errors/user-not-found';

export class AdminInMemoryRepository implements AdminManagerInterface {
	private items: AdminEntity[] = [];

	constructor() { }

	public async create(
		data: AdminEntity,
	): PromiseEither<AbstractError, AdminEntity> {
		const adminOrErr = await AdminEntity.build(data as any);

		if (adminOrErr.isLeft()) {
			return left(adminOrErr.extract());
		}

		const admin = adminOrErr.extract();

		admin.defineId(faker.datatype.uuid());

		this.items.push(admin);

		return right(admin);
	}

	public async findByEmail(
		email: string,
	): PromiseEither<AbstractError, AdminEntity> {
		const user = this.items.find((item) => item.email === email);

		if (!user) {
			return left(new UserNotFoundError());
		}

		const adminOrErr = await AdminEntity.build(user as any);

		if (adminOrErr.isLeft()) {
			return left(adminOrErr.extract());
		}

		return right(adminOrErr.extract());
	}

	public async findAll(): PromiseEither<AbstractError, AdminEntity[]> {
		return right(this.items);
	}

	public async findById(
		id: string,
	): PromiseEither<AbstractError, AdminEntity> {
		const user = this.items.find((item) => item._id === id);

		if (!user) {
			return left(new UserNotFoundError());
		}

		const adminOrErr = await AdminEntity.build(user as any);

		if (adminOrErr.isLeft()) {
			return left(adminOrErr.extract());
		}

		return right(adminOrErr.extract());
	}
}
