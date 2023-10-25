import { UnityNotFoundError } from 'App/Core/domain/errors/unity-not-found'
import { CensusUnitiesManagerContract } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { ICensusActivitiesByProf } from 'App/Types/ICensus'

type FindActivitiesOfProfByProfByUnityProps = {
	unity_id: string
	date_start?: string
	date_end?: string
	prof_id?: string
}

type UseCaseFindActivitiesByProf = UseCase<
	FindActivitiesOfProfByProfByUnityProps,
	ICensusActivitiesByProf[]
>

export class FindActivitiesOfProfByProfByUnityUseCase
	implements UseCaseFindActivitiesByProf {
	constructor(private readonly count: CensusUnitiesManagerContract) { }

	public async execute({
		unity_id,
		date_start,
		date_end,
		prof_id,
	}: FindActivitiesOfProfByProfByUnityProps): PromiseEither<
		AbstractError,
		ICensusActivitiesByProf[]
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

		const count_by_activity_by_profOrErr = await this.count.findActivitiesOfProf(
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

		return right(count_by_activity_by_prof)
	}
}
