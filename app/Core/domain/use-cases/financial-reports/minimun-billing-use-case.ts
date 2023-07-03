import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither } from 'App/Core/shared'

import { months } from '../helpers/dates'

type Report = {}

export class MinimumBillingReportUseCase implements UseCase<months, Report> {
	constructor() { }

	public async execute(): PromiseEither<AbstractError, Report> {
		return
	}
}
