import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { IProcedure } from 'App/Types/IProcedure'

export interface ProceduresManagerInterface {
	findByName: (
		name: string,
		unity_id: string,
	) => PromiseEither<AbstractError, IProcedure[]>
	findByProcedureId: (
		id: string,
		unity_id: string,
	) => PromiseEither<AbstractError, IProcedure>
	findByUnityId: (unity_id: string) => PromiseEither<AbstractError, IProcedure[]>
	deleteById: (id: string) => PromiseEither<AbstractError, IProcedure>
	createProcedure: (data: any) => PromiseEither<AbstractError, IProcedure>
	updateProceduresById: (
		id: string,
		data: Partial<IProcedure>,
	) => PromiseEither<AbstractError, IProcedure>
}
