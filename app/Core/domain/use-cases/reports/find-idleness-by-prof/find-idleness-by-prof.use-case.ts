import { UnityNotFoundError } from 'App/Core/domain/errors/unity-not-found'
import { CensusDaysManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { ICensusIdlenessByProf } from 'App/Types/ICensus'
import { DaysTradesIntervalDatesParams } from './day-trades-interval-dates'

type FinIdlenessIn = {
	unity_id: string
	prof_id?: string
	date_start?: string
	date_end?: string
}

type UseCaseFindIdlenessByProf = UseCase<FinIdlenessIn, ICensusIdlenessByProf[]>

export class FindIdlenessByProfUseCase implements UseCaseFindIdlenessByProf {
	constructor(
		private readonly count: CensusDaysManagerInterface,
		private readonly hoursTrades: UseCase<
			DaysTradesIntervalDatesParams,
			ICensusIdlenessByProf
		>,
	) { }

	public async execute({
		unity_id,
		date_start,
		date_end,
		prof_id,
	}: FinIdlenessIn): PromiseEither<AbstractError, ICensusIdlenessByProf[]> {
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

		const hoursWorkedOrErr = await this.count.findHoursWorked(
			unity_id,
			date_start,
			date_end,
			prof_id,
		)

		if (hoursWorkedOrErr.isLeft()) {
			return left(hoursWorkedOrErr.extract())
		}

		const hoursWorked = hoursWorkedOrErr.extract()

		const idleness = await Promise.all(
			hoursWorked.map(async ({ value, count, label }) => {
				const hoursIdleness = await this.hoursTrades.execute({
					id: value,
					unity_id,
					date_start,
					date_end,
					count,
					name: label,
				})

				if (hoursIdleness.isLeft()) {
					return {
						err: hoursIdleness.extract(),
					} as unknown as ICensusIdlenessByProf
				}

				return hoursIdleness.extract()
			}),
		)

		return right(idleness.filter((item) => !!item.idleness))
	}
}
