/* eslint-disable prettier/prettier */
/* eslint-disable indent */
import { UnityNotFoundError } from 'App/Core/domain/errors/unit-not-found'
import { CensusDaysManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { ICensusActivitiesByDaysOfMonth } from 'App/Types/ICensus'

type FindActivitiesByUnityOrProfProps = {
	unity_id: string
	date_start?: string
	date_end?: string
	prof_id?: string
}

export class findActivitiesByDaysOfMonthUseCase
	implements UseCase<FindActivitiesByUnityOrProfProps, ICensusActivitiesByDaysOfMonth[]>
{
	constructor(private readonly manager: CensusDaysManagerInterface) { }

	public async execute({
		unity_id,
		date_start,
		date_end,
		prof_id,
	}: FindActivitiesByUnityOrProfProps): PromiseEither<
		AbstractError,
		ICensusActivitiesByDaysOfMonth[]
	> {
		if (!unity_id) {
			return left(new UnityNotFoundError())
		}

		if (!date_start) {
			const now = new Date()
			date_start = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
		}

		if (!date_end) {
			const now = new Date()
			date_end = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString()
		}

		const count_by_daysOrErr =
			await this.manager.findActivitiesByDaysOfMonth(
				unity_id,
				date_start,
				date_end,
				prof_id,
			)

		if (count_by_daysOrErr.isLeft()) {
			return left(
				new AbstractError(
					'Error on find activities by days of month by unity or professional',
					400,
				),
			)
		}

		const count_by_days = count_by_daysOrErr.extract()

		return right(count_by_days)
	}
}
