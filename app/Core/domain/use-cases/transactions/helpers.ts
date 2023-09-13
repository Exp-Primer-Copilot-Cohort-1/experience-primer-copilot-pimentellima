import { IProcedureTransaction, ITransaction } from 'App/Types/ITransaction'

export type TransactionWithoutProcedure = Omit<ITransaction, 'procedures'>

export type TransactionWithProcedure = Omit<
	ITransaction,
	'procedures' | 'prof' | 'client'
> & {
	procedures: IProcedureTransaction[]
	prof: { value: string; label: string }
	client: { value: string; label: string }
}

export type TransactionWithActivity = ITransaction & {
	id: string
	unity_id: string
	activity_id: string
}
