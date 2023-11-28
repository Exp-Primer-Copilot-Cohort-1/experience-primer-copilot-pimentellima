import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { IUser } from 'App/Types/IUser'
import { ICount } from '../helpers/count'

export interface SecsManagerContract {
	findAll: () => PromiseEither<AbstractError, IUser[]>
	getCount: () => PromiseEither<AbstractError, ICount>
	update: (id: string, data: IUser) => PromiseEither<AbstractError, IUser>
}
