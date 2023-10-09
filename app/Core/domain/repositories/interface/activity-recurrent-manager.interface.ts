import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { IActivity, IActivityPending, RecurrentActivityValues } from 'App/Types/IActivity'

export interface ActivitiesRecurrentManagerInterface {
	create: (
		unity_id: string,
		values: RecurrentActivityValues,
	) => PromiseEither<AbstractError, IActivity[]>

	findAll: (
		unity_id: string,
		...args: unknown[]
	) => PromiseEither<AbstractError, IActivityPending[]>
}
