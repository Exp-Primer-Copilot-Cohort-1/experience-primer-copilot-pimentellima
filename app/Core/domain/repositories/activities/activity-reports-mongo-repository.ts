import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared'
import { IActivity } from 'Types/IActivity'
import { ActivitiesReportsManagerInterface } from '../interface/activity-reports-manager.interface'

export class ActivitiesReportsMongoRepository
	// eslint-disable-next-line indent
	implements ActivitiesReportsManagerInterface {
	async findAllActivitiesByMonth(
		unity_id: string,
		month: number,
	): PromiseEither<AbstractError, IActivity[]> {
		throw new Error('Method not implemented.')
	}
}
