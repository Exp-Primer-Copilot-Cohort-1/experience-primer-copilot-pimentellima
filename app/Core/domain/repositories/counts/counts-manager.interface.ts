import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { ICount } from '../helpers/count'


export interface CountsManagerInterface {
	getCount: () => PromiseEither<AbstractError, ICount>
}
