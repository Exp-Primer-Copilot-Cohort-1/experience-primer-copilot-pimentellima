import { IProcedureTransaction, ITransaction } from 'App/Types/ITransaction'

export type TransactionWithoutProcedure = ITransaction

export type TransactionWithProcedure = Omit<
	ITransaction,
	'procedures' | 'prof' | 'client'
> & {
	procedures: IProcedureTransaction[]
	prof?: string
	client?: string
}

export type TransactionWithActivity = ITransaction & {
	id: string
	unity_id: string
	activity_id: string
}
