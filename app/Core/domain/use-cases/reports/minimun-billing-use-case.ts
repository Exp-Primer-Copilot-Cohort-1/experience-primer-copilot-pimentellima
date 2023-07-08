import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'

import { MissingParamsError } from '../../errors/missing-params'
import { ProfManagerInterface } from '../../repositories/interface/prof-manage-interface'
import { Months, MonthsEnum } from '../helpers/dates'

type Report = {
	current: number
	desirable: number
	expected: number
}

type Range = {
	unity_id: string
	month?: Months
	year?: number
}

export class MinimumBillingReportUseCase implements UseCase<Range, Report> {
	constructor(private readonly manager: ProfManagerInterface) { }

	public async execute(range: Range): PromiseEither<AbstractError, Report> {
		if (!range?.unity_id) return left(new MissingParamsError('unity_id'))

		const month = range?.month ? MonthsEnum[range?.month] : new Date().getMonth() + 1
		const year = range?.year || new Date().getFullYear()

		const profsOrErr = await this.manager.findAll(range.unity_id)

		if (profsOrErr.isLeft()) return left(profsOrErr.extract())

		// console.log(profsOrErr.extract())

		return right({
			current: 0,
			desirable: 0,
			expected: 0,
		})
	}
}
