import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { ICount } from '../helpers/count'

export interface Count {
	countDocuments: (where: Record<string, any>) => number
}

export interface CountsManagerInterface {
	getCount: (unity_id: string) => PromiseEither<AbstractError, ICount>
}
