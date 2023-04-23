import AdminEntity from 'App/Core/domain/entities/user/admin';
import { PromiseEither, left, right } from 'App/Core/shared/either';
import { AdminManagerInterface } from '../interface/admin-manager.interface';

import { AbstractError } from 'App/Core/errors/error.interface';
import User from 'App/Models/User';
import { UserNotFoundError } from '../../errors/user-not-found';

export class AdminMongooseRepository implements AdminManagerInterface {
	constructor() { }

	public async create(
		admin: AdminEntity,
	): PromiseEither<AbstractError, AdminEntity> {
		const user = await User.create(admin.params());

		admin.defineId(user._id);
		return right(admin);
	}

	public async findByEmail(
		email: string,
	): PromiseEither<AbstractError, AdminEntity> {
		const user = await User.findOne({ email });

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
		const users = await User.find({
			type: {
				$in: ['admin', 'admin_prof'],
			},
		});

		const entities = await Promise.all(
			users.map(async (user) => {
				const adminOrErr = await AdminEntity.build(user as any);

				if (adminOrErr.isLeft()) {
					return {} as AdminEntity;
				}

				return adminOrErr.extract();
			}),
		);

		return right(entities);
	}

	public async findById(
		id: string,
	): PromiseEither<AbstractError, AdminEntity> {
		const user = await User.findById(id);

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
