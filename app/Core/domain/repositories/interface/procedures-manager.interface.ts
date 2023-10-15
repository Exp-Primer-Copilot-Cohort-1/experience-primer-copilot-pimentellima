import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { IProcedure } from 'App/Types/IProcedure'
import { ICount } from '../helpers/count'

export interface ProceduresManagerInterface {
	getCount: (unity_id: string) => PromiseEither<AbstractError, ICount>
	findByName: (
		name: string,
		unity_id: string,
	) => PromiseEither<AbstractError, IProcedure[]>
	findById: (id: string) => PromiseEither<AbstractError, IProcedure>
	findAll: (unity_id: string) => PromiseEither<AbstractError, IProcedure[]>
	deleteById: (id: string) => PromiseEither<AbstractError, IProcedure>
	create: (data: any) => PromiseEither<AbstractError, IProcedure>
	update: (
		id: string,
		data: Partial<IProcedure>,
	) => PromiseEither<AbstractError, IProcedure>
}
