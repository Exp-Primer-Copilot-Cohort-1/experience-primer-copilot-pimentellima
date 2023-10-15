import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { IProcedure } from 'App/Types/IProcedure'

export interface ProceduresManagerInterface {
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
