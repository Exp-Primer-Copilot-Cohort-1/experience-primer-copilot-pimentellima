import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { ActivityValues, IActivity } from 'App/Types/IActivity'

export interface ActivitiesManagerInterface {
	createActivity: (
		unity_id: string,
		values: IActivity,
	) => PromiseEither<AbstractError, IActivity>

	findAllActivities: (
		unity_id: string,
		...args: unknown[]
	) => PromiseEither<AbstractError, IActivity[]>

	findActivitiesByProf: (
		unity_id: string,
		prof_id: string,
	) => PromiseEither<AbstractError, IActivity[]>
	findActivitiesByClient: (
		unity_id: string,
		client_id: string,
	) => PromiseEither<AbstractError, IActivity[]>
	findActivityById: (id: string) => PromiseEither<AbstractError, IActivity>
	updateActivityById: (
		id: string,
		values: ActivityValues,
	) => PromiseEither<AbstractError, IActivity>
	deleteActivityById: (id: string) => PromiseEither<AbstractError, IActivity>
}
