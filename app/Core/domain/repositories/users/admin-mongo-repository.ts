import AdminEntity from 'App/Core/domain/entities/user/admin';
import { PromiseEither, left, right } from 'App/Core/shared/either';
import { AdminManagerInterface } from '../interface/admin-manager.interface';

import User from 'App/Models/User';

export class AdminMongooseRepository implements AdminManagerInterface {
	constructor() { }

	public async create(data: AdminEntity): PromiseEither<Error, AdminEntity> {
		const adminOrErr = await AdminEntity.build(data as any);

		if (adminOrErr.isLeft()) {
			return left(adminOrErr.extract());
		}

		const admin = adminOrErr.extract();

		const user = await User.create(admin);

		admin.defineId(user._id);

		return right(admin);
	}

	public async findByEmail(email: string): PromiseEither<Error, AdminEntity> {
		const user = await User.findOne({ email });

		if (!user) {
			return left(new Error('Usuário não encontrada'));
		}

		const adminOrErr = await AdminEntity.build(user as any);

		if (adminOrErr.isLeft()) {
			return left(adminOrErr.extract());
		}

		return right(adminOrErr.extract());
	}

	public async findAll(): PromiseEither<Error, AdminEntity[]> {
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

	public async findById(id: string): PromiseEither<Error, AdminEntity> {
		const user = await User.findById(id);

		if (!user) {
			return left(new Error('Usuário não encontrada'));
		}

		const adminOrErr = await AdminEntity.build(user as any);

		if (adminOrErr.isLeft()) {
			return left(adminOrErr.extract());
		}

		return right(adminOrErr.extract());
	}
}
