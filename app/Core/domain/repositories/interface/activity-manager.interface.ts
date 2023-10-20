import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { ActivityValues, IActivity } from 'App/Types/IActivity'

export interface ActivitiesManagerInterface {
	create: (
		unity_id: string,
		values: IActivity,
	) => PromiseEither<AbstractError, IActivity>
	findAll: (
		unity_id: string,
		...args: unknown[]
	) => PromiseEither<AbstractError, IActivity[]>
	findByProf: (
		unity_id: string,
		prof_id: string,
	) => PromiseEither<AbstractError, IActivity[]>
	findByClient: (
		unity_id: string,
		client_id: string,
	) => PromiseEither<AbstractError, IActivity[]>
	find: (id: string) => PromiseEither<AbstractError, IActivity>
	updateById: (
		id: string,
		values: ActivityValues,
	) => PromiseEither<AbstractError, IActivity>
	deleteById: (id: string) => PromiseEither<AbstractError, IActivity>
}
