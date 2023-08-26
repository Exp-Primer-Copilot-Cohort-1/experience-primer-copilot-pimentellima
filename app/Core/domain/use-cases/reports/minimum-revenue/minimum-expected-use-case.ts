import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'

import { MissingParamsError } from 'App/Core/domain/errors/missing-params'
import { IBilling } from 'Types/IBilling'
import { IProcedure } from 'Types/IProcedure'
import { UnityReportsRevenues, UpdateAttrReportsRevenues } from '../../helpers/reports'
import { AverageProcedureProps } from '../../procedures/average-price-procedures-group-by-prof'
import { DaysTradeParams } from './day-trades-by-prof'

type Range = {
	unity_id: string
	day?: number
	month?: number
	year?: number
}

export class MinimumDesirableUseCase implements UseCase<Range, IBilling> {
	constructor(
		private readonly average: UseCase<AverageProcedureProps, Partial<IProcedure>[]>,
		private readonly daysTrade: UseCase<DaysTradeParams, number>,
		private readonly updateAttr: UseCase<UpdateAttrReportsRevenues, IBilling>,
		private readonly updateCurrent: UseCase<UnityReportsRevenues, IBilling>,
	) { }

	public async execute({
		unity_id,
		day = new Date().getDate(),
		month = new Date().getMonth(),
		year = new Date().getFullYear(),
	}: Range): PromiseEither<AbstractError, IBilling> {
		if (!unity_id) return left(new MissingParamsError('unity_id'))

		const profsOrErr = await this.average.execute({ unity_id })

		if (profsOrErr.isLeft()) return left(profsOrErr.extract())

		const profs = profsOrErr.extract()

		const minimum_desirable_by_profs = await Promise.all(
			profs.map(async (prof) => {
				if (!prof._id) return 0

				const daysOrErr = await this.daysTrade.execute({
					_id: prof._id,
					unity_id,
					day,
					month,
					year,
				})

				if (daysOrErr.isLeft()) return 0

				const hours = daysOrErr.extract()

				if (!prof.avgPrice) return 0

				return hours * prof.avgPrice
			}),
		)

		const minimum_desirable = minimum_desirable_by_profs.reduce(
			(acc, curr) => acc + curr,
			0,
		)

		const billingOrErr = await this.updateAttr.execute({
			unity_id,
			value: minimum_desirable,
			month,
		})

		if (billingOrErr.isLeft()) return left(billingOrErr.extract())

		const billingCurrentOrErr = await this.updateCurrent.execute({
			unity_id,
			month,
			year,
		})

		if (billingCurrentOrErr.isLeft()) return left(billingCurrentOrErr.extract())

		return billingCurrentOrErr
	}
}
