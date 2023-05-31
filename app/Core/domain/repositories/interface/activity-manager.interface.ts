import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { IActivity } from 'Types/IActivity'
import { STATUS } from 'App/Helpers'

export interface ActivitiesManagerInterface {
	createActivity: (activity: IActivity) => PromiseEither<AbstractError, IActivity>
	findAllActivities: (unity_id: string) => PromiseEither<AbstractError, IActivity[]>
	updateActivityById: (
		id: string,
		activity: IActivity,
	) => PromiseEither<AbstractError, IActivity>
	updateActivityStatusById: (id: string, status: STATUS) => PromiseEither<AbstractError, IActivity>
	findActivitiesByProf: (
		unity_id: string,
		prof_id: string,
	) => PromiseEither<AbstractError, IActivity[]>
	findActivitiesByClient: (
		unity_id: string,
		client_id: string,
	) => PromiseEither<AbstractError, IActivity[]>
	findActivityById: (id: string) => PromiseEither<AbstractError, IActivity>
	deleteActivityById: (id: string) => PromiseEither<AbstractError, IActivity>
}
