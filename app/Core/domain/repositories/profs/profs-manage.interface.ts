import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { IProf } from 'App/Types/IProf'
import { IUser } from 'App/Types/IUser'
import { ICount } from '../helpers/count'

export interface ProfsManagerContract {
	findById: (id: string) => PromiseEither<AbstractError, IUser>
	findAll: () => PromiseEither<AbstractError, IUser[]>
	getCount: () => PromiseEither<AbstractError, ICount>
	update: (id: string, data: IProf) => PromiseEither<AbstractError, IProf>
}
