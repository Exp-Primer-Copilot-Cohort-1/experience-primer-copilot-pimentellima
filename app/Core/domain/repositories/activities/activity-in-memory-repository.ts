import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { AppointmentStatus } from 'App/Helpers'
import { ActivityValues, IActivity } from 'App/Types/IActivity'
import { ActivitiesManagerContract } from '../interface'

export class ActivityInMemoryRepository implements ActivitiesManagerContract {
	public activities: any[] = []

	constructor() { }
	create: (unity_id: string, values: IActivity) => PromiseEither<AbstractError, IActivity>
	findAll: (unity_id: string, ...args: unknown[]) => PromiseEither<AbstractError, IActivity[]>
	findByProf: (unity_id: string, prof_id: string) => PromiseEither<AbstractError, IActivity[]>
	findByClient: (unity_id: string, client_id: string) => PromiseEither<AbstractError, IActivity[]>
	find: (id: string) => PromiseEither<AbstractError, IActivity>
	updateById: (id: string, values: ActivityValues) => PromiseEither<AbstractError, IActivity>
	deleteById: (id: string) => PromiseEither<AbstractError, IActivity>
	createActivity: (activity: IActivity) => PromiseEither<AbstractError, IActivity>
	createActivityInAwait: (
		activity: IActivity,
	) => PromiseEither<AbstractError, IActivity>
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
