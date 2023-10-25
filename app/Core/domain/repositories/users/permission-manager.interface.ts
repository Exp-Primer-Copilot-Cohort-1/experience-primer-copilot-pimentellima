import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { IPermission } from 'App/Types/IPermission'

export interface PermissionManagerContract {
	find: (id: string) => PromiseEither<AbstractError, IPermission>
	update: (id: string, data: Partial<IPermission>) => PromiseEither<AbstractError, IPermission>
}
