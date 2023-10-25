import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { IUser as IProf } from 'App/Types/IUser'
import { ICount } from '../helpers/count'

export interface SecsManagerContract {
	findAll: () => PromiseEither<AbstractError, IProf[]>
	getCount: () => PromiseEither<AbstractError, ICount>
}
