import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { BasicProcedure, IProcedure } from 'App/Types/IProcedure'
import { StockProcedure } from 'App/Types/ITransaction'

export interface ProceduresManagerContract {
	findByName: (
		name: string,
		unity_id: string,
	) => PromiseEither<AbstractError, IProcedure[]>
	findById: (id: string) => PromiseEither<AbstractError, IProcedure>
	findAll: (unity_id: string) => PromiseEither<AbstractError, IProcedure[]>
	delete: (id: string) => PromiseEither<AbstractError, IProcedure>
	create: (data: any) => PromiseEither<AbstractError, IProcedure>
	update: (
		id: string,
		data: Partial<IProcedure>,
	) => PromiseEither<AbstractError, IProcedure>
	findBasic(
		id: string,
		health_insurance_id: string
	): PromiseEither<AbstractError, BasicProcedure>
	addProduct(
		id: string,
		product: StockProcedure
	): PromiseEither<AbstractError, IProcedure>
	removeProduct(
		id: string,
		product_id: string
	): PromiseEither<AbstractError, IProcedure>
}
