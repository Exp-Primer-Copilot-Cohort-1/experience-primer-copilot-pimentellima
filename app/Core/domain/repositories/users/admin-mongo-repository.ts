import AdminEntity from 'App/Core/domain/entities/user/admin'
import { PromiseEither, left, right } from 'App/Core/shared/either'
import { AdminManagerInterface } from '../interface/admin-manager.interface'

import { AbstractError } from 'App/Core/errors/error.interface'
import { ISessionTransaction, SessionTransaction } from 'App/Core/infra/session-transaction'
import User from 'App/Models/User'
import { IAdminUser } from 'App/Types/IAdminUser'
import { inject, injectable, registry } from 'tsyringe'
import { UserNotFoundError } from '../../errors/user-not-found'

@injectable()
@registry([{ token: AdminMongooseRepository, useClass: AdminMongooseRepository }])
export class AdminMongooseRepository implements AdminManagerInterface {

	constructor(
		@inject(SessionTransaction) private readonly session: ISessionTransaction
	) { } // eslint-disable-line

	async activation(id: string): PromiseEither<AbstractError, IAdminUser> {
		const user = await User.findByIdAndUpdate(id, { active: true }, { ...this.session.options })

		if (!user) {
			return left(new UserNotFoundError())
		}

		return right(user as IAdminUser)
	}

	async create({
		_id, // eslint-disable-line
		...admin
	}: IAdminUser): PromiseEither<AbstractError, IAdminUser> {
		const user = await User.create([admin], { ...this.session.options })

		if (!user) {
			return left(new AbstractError('Não foi possível criar o usuário', 401))
		}

		return right(user[0] as IAdminUser)
	}

	async findByEmail(email: string): PromiseEither<AbstractError, IAdminUser> {
		const user = await User.findOne({ email })

		if (!user) {
			return left(new UserNotFoundError())
		}

		const adminOrErr = await AdminEntity.build(user as any)

		if (adminOrErr.isLeft()) {
			return left(adminOrErr.extract())
		}

		return right(adminOrErr.extract())
	}

	async findAll(): PromiseEither<AbstractError, IAdminUser[]> {
		const users = await User.find({
			type: {
				$in: ['admin', 'admin_prof'],
			},
		})

		const entities = await Promise.all(
			users.map(async (user) => {
				const adminOrErr = await AdminEntity.build(user as any)

				if (adminOrErr.isLeft()) {
					return {} as AdminEntity
				}

				return adminOrErr.extract()
			}),
		)

		return right(entities)
	}

	async findById(id: string): PromiseEither<AbstractError, IAdminUser> {
		const user = await User.findById(id)

		if (!user) {
			return left(new UserNotFoundError())
		}

		const adminOrErr = await AdminEntity.build(user as any)

		if (adminOrErr.isLeft()) {
			return left(adminOrErr.extract())
		}

		return right(adminOrErr.extract())
	}
}
