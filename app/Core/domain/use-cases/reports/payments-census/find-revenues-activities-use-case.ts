import { UnityNotFoundError } from 'App/Core/domain/errors/unity-not-found'
import { CensusRevenuesManagerContract } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { ICensusRevenuesOfYearByUnityByProf } from 'App/Types/ICensus'

type FindRevenuesActivitiesProps = {
	unity_id: string
	date_start?: string
	date_end?: string
	prof_id?: string
}

type ICensusRevenues = {
	accrual_regime: ICensusRevenuesOfYearByUnityByProf
	cash_regime: ICensusRevenuesOfYearByUnityByProf
}

export class FindRevenuesActivitiesUseCase
	implements UseCase<FindRevenuesActivitiesProps, ICensusRevenues>
{
	constructor(private readonly managerRevenues: CensusRevenuesManagerContract) { }

	public async execute({
		unity_id,
		date_start,
		date_end,
		prof_id,
	}: FindRevenuesActivitiesProps): PromiseEither<AbstractError, ICensusRevenues> {
		if (!unity_id) {
			return left(new UnityNotFoundError())
		}

		if (!date_start) {
			// Set date_start as the first day of the current month
			const now = new Date()
			date_start = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
		}

		if (!date_end) {
			// Set date_end as the last day of the current month
			const now = new Date()
			date_end = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString()
		}

		const [accrualRegimeOrErr, cashRegimeOrErr] = await Promise.all([
			this.managerRevenues.findRevenuesAccrualRegimeActivities(
				unity_id,
				date_start,
				date_end,
				prof_id,
			),
			this.managerRevenues.findRevenuesCashRegimeActivities(
				unity_id,
				date_start,
				date_end,
				prof_id,
			),
		])

		if (accrualRegimeOrErr.isLeft() || cashRegimeOrErr.isLeft()) {
			return left(
				new AbstractError(
					'Error on find cash regime revenues for activities',
					400,
				),
			)
		}

		const revenues_activities = {
			accrual_regime: accrualRegimeOrErr.extract(),
			cash_regime: cashRegimeOrErr.extract(),
		}

		return right(revenues_activities)
	}
}
