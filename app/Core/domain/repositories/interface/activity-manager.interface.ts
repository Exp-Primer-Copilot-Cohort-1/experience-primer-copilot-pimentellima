import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { AppointmentStatus } from 'App/Helpers'
import {
	ActivityValues,
	IActivity,
	IActivityPending,
	RecurrentActivityValues,
} from 'Types/IActivity'
import { ITransaction } from 'Types/ITransaction'

export interface ActivitiesManagerInterface {
	createActivity: (
		unity_id: string,
		values: ActivityValues,
	) => PromiseEither<AbstractError, IActivity>
	createRecurrentActivity: (
		unity_id: string,
		values: RecurrentActivityValues,
	) => PromiseEither<AbstractError, IActivity[]>
	findAllActivities: (
		unity_id: string,
		...args: unknown[]
	) => PromiseEither<AbstractError, IActivity[]>
	findAllActivitiesPending: (
		unity_id: string,
		...args: unknown[]
	) => PromiseEither<AbstractError, IActivityPending[]>

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
	updateActivityPayment: (
		id: string,
		unity_id: string,
		values: Partial<ITransaction>,
	) => PromiseEither<AbstractError, IActivity>
	deleteActivityById: (id: string) => PromiseEither<AbstractError, IActivity>
}
