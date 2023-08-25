import { UnitNotFoundError } from 'App/Core/domain/errors/unit-not-found'
import { CensusUnitiesManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { ICensusActivitiesByProf } from 'Types/ICensus'

type FinIdlenessIn = {
	unity_id: string
	prof_id?: string
	date_start?: string
	date_end?: string
}

type UseCaseFindIdlenessByProf = UseCase<FinIdlenessIn, ICensusActivitiesByProf[]>

export class FindIdlenessByProfUseCase implements UseCaseFindIdlenessByProf {
	constructor(private readonly count: CensusUnitiesManagerInterface) { }

	public async execute({
		unity_id,
		date_start,
		date_end,
		prof_id,
	}: FinIdlenessIn): PromiseEither<AbstractError, ICensusActivitiesByProf[]> {
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

		const idleness_by_profOrErr = await this.count.findActivitiesOfProf(
			unity_id,
			date_start,
			date_end,
			prof_id,
		)

		if (idleness_by_profOrErr.isLeft()) {
			return left(
				new AbstractError(
					'Error on find activities of professional by unity',
					400,
				),
			)
		}

		const idleness_by_prof = idleness_by_profOrErr.extract()

		return right(idleness_by_prof)
	}
}
