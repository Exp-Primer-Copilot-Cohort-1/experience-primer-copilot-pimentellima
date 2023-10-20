import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { AppointmentStatus } from 'App/Helpers'
import { IActivity } from 'App/Types/IActivity'
import { ITransaction } from 'App/Types/ITransaction'

export interface ActivitiesManagerAttendanceInterface {
	updateActivityStatusById: (
		id: string,
		status: AppointmentStatus,
	) => PromiseEither<AbstractError, IActivity>
	startActivity: (
		id: string,
		started_at: Date,
	) => PromiseEither<AbstractError, IActivity>
	stopActivity: (
		id: string,
		finished_at: Date,
	) => PromiseEither<AbstractError, IActivity>
	updateActivityPayment: (
		id: string,
		values: Partial<ITransaction>,
	) => PromiseEither<AbstractError, IActivity>
}
