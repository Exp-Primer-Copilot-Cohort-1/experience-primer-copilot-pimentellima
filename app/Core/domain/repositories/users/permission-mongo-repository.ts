import { PromiseEither } from 'App/Core/shared/either'

import { AbstractError } from 'App/Core/errors/error.interface'
import { ISessionTransaction } from 'App/Core/infra/infra'
import { SessionTransaction } from 'App/Core/infra/session-transaction'
import { IPermission } from 'App/Types/IPermission'
import { inject, injectable, registry } from 'tsyringe'
import { PermissionManagerContract } from './permission-manager.interface'

@injectable()
@registry([{ token: PermissionMongoRepository, useClass: PermissionMongoRepository }])
export class PermissionMongoRepository implements PermissionManagerContract {

	constructor(
		@inject(SessionTransaction) private readonly session: ISessionTransaction
	) { } // eslint-disable-line
	find: (id: string) => PromiseEither<AbstractError, IPermission>
	update: (id: string, data: IPermission) => PromiseEither<AbstractError, IPermission>
}
