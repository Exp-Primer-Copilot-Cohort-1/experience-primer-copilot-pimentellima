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

	public findAll(): PromiseEither<Error, AdminEntity[]> {
		throw new Error('Method not implemented.');
	}

	public findById(id: string): PromiseEither<Error, AdminEntity> {
		return new Promise((resolve) => {
			User.findById(id)
				.then(async (user) => {
					if (!user) {
						return resolve(
							left(new Error('Usuário não encontrada')),
						);
					}

					const adminOrErr = await AdminEntity.build(user as any);

					if (adminOrErr.isLeft()) {
						return resolve(left(adminOrErr.extract()));
					}

					return resolve(right(adminOrErr.extract()));
				})
				.catch((error) => {
					return resolve(left(new Error(error.message)));
				});
		});
	}
}
