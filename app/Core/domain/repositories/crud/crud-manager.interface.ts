import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { ICount } from '../helpers/count'


export interface CRUDManagerInterface<T> {
	getCount: () => PromiseEither<AbstractError, ICount>
	findAll: () => PromiseEither<AbstractError, T[]>
	findById: (id: string) => PromiseEither<AbstractError, T>
}
