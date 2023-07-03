import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { AppointmentStatus } from 'App/Helpers'
import { IActivity } from 'Types/IActivity'

export interface ActivitiesManagerInterface {
	createActivity: (activity: IActivity) => PromiseEither<AbstractError, IActivity>
	findAllActivities: (unity_id: string) => PromiseEither<AbstractError, IActivity[]>
	updateActivityById: (
		id: string,
		activity: IActivity,
	) => PromiseEither<AbstractError, IActivity>
	updateActivityStatusById: (
		id: string,
		status: AppointmentStatus,
	) => PromiseEither<AbstractError, IActivity>
	updateActivityStartedAt: (
		id: string,
		started_at: Date,
	) => PromiseEither<AbstractError, IActivity>
	updateActivityFinishedAt: (
		id: string,
		finished_at: Date,
	) => PromiseEither<AbstractError, IActivity>
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
