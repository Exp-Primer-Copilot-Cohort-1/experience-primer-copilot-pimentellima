import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { IActivityPending } from 'App/Types/IActivity'

export interface ActivitiesRecurrentManagerContract {
	create: (
		unity_id: string,
		values: IActivityPending,
	) => PromiseEither<AbstractError, IActivityPending>

	findAll: (
		unity_id: string,
		...args: unknown[]
	) => PromiseEither<AbstractError, IActivityPending[]>
}
