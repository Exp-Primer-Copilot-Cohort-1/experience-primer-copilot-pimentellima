import { PromiseEither, right } from 'App/Core/shared/either'

import { UserNotFoundError } from 'App/Core/domain/errors'
import { AbstractError } from 'App/Core/errors/error.interface'
import { ISessionTransaction } from 'App/Core/infra/infra'
import { SessionTransaction } from 'App/Core/infra/session-transaction'
import Permissions from 'App/Models/Permissions'
import { IPermission } from 'App/Types/IPermission'
import { inject, injectable, registry } from 'tsyringe'
import { PermissionManagerContract } from './permission-manager.interface'

@injectable()
@registry([{ token: PermissionMongoRepository, useClass: PermissionMongoRepository }])
export class PermissionMongoRepository implements PermissionManagerContract {

	constructor(
		@inject(SessionTransaction) private readonly session: ISessionTransaction
	) { } // eslint-disable-line

	async find(id: string): PromiseEither<AbstractError, IPermission> {
		const doc = await Permissions
			.findById(id)
			.orFail(new UserNotFoundError())

		return right(doc.toJSON())
	}

	async update(id: string, data: IPermission): PromiseEither<AbstractError, IPermission> {
		const doc = await Permissions
			.findByIdAndUpdate(id, data, { new: true })
			.orFail(new UserNotFoundError())

		return right(doc.toJSON())
	}
}
