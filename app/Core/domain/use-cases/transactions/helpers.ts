import { ITransaction } from 'App/Types/ITransaction'

export type TransactionWithoutProcedure = ITransaction

export type TransactionWithProcedure = Omit<ITransaction, 'prof' | 'client'> & {
	prof?: string
	client?: string
}

export type TransactionWithActivity = ITransaction & {
	id: string
	unity_id: string
	activity_id: string
}
