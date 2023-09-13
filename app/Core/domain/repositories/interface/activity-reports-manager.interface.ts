import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { IActivity } from 'App/Types/IActivity'

export interface ActivitiesReportsManagerInterface {
	findAllActivitiesByMonth: (
		unity_id: string,
		month: number,
	) => PromiseEither<AbstractError, IActivity[]>
}
