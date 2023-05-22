import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { IActivity } from 'Types/IActivity'
import ActivityEntity from '../../entities/activities/activity'

export interface ActivitiesManagerInterface {
	createActivity: (activity: IActivity) => PromiseEither<AbstractError, ActivityEntity>
	findAllActivities: (unity_id: string) => PromiseEither<AbstractError, IActivity[]>
	updateActivityById: (
		id: string,
		activity: IActivity,
	) => PromiseEither<AbstractError, ActivityEntity>
	findActivitiesByProf: (
		unity_id: string,
		prof_id: string,
	) => PromiseEither<AbstractError, ActivityEntity[]>
	findActivitiesByClient: (
		unity_id: string,
		client_id: string,
	) => PromiseEither<AbstractError, ActivityEntity[]>
	findActivityById: (id: string) => PromiseEither<AbstractError, ActivityEntity>
	deleteActivityById: (id: string) => PromiseEither<AbstractError, ActivityEntity>
}
