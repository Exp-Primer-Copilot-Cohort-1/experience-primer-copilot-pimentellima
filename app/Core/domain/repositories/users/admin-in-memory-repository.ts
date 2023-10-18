import AdminEntity from 'App/Core/domain/entities/user/admin';
import { PromiseEither, left, right } from 'App/Core/shared/either';
import { AdminManagerInterface } from '../interface/admin-manager.interface';

import { faker } from '@faker-js/faker';
import { UserAlreadyExistsError } from 'App/Core/domain/errors/user-already-exists-error';
import { UserNotFoundError } from 'App/Core/domain/errors/user-not-found';
import { AbstractError } from 'App/Core/errors/error.interface';

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

		admin.defineId(faker.string.uuid());

		const item = this.items.find((item) => item.email === admin.email)

		if (item) return left(new UserAlreadyExistsError())

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
