import { UnitNotFoundError } from 'App/Core/domain/errors/unit-not-found'
import { CensusUnitiesManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { ICensusPayments } from '../../helpers/census'

type FindActivitiesOfProfByProfByUnityProps = {
	unity_id: string
	date_start?: string
	date_end?: string
	prof_id?: string
}

export class FindActivitiesOfProfByProfByUnityUseCase
	implements UseCase<FindActivitiesOfProfByProfByUnityProps, ICensusPayments>
{
	constructor(private readonly count: CensusUnitiesManagerInterface) { }

	public async execute({
		unity_id,
		date_start,
		date_end,
		prof_id,
	}: FindActivitiesOfProfByProfByUnityProps): PromiseEither<
		AbstractError,
		ICensusPayments
	> {
		if (!unity_id) {
			return left(new UnitNotFoundError())
		}

		if (!date_start) {
			const now = new Date()
			date_start = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
		}

		if (!date_end) {
			const now = new Date()
			date_end = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString()
		}

		const count_by_activity_by_profOrErr =
			await this.count.findActivitiesOfProfByProfByUnity(
				unity_id,
				date_start,
				date_end,
				prof_id,
			)

		if (count_by_activity_by_profOrErr.isLeft()) {
			return left(
				new AbstractError(
					'Error on find activities of professional by unity',
					400,
				),
			)
		}

		const count_by_activity_by_prof = count_by_activity_by_profOrErr.extract()

		return right({ count_by_activity_by_prof })
	}
}
