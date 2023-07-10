import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { ProfManagerInterface } from '../../repositories/interface/prof-manage-interface'
import { getHolidayByMonth } from '../helpers/holidays'

type workedDays = number

type Prof = {
	_id: string
	unity_id: string
	month: number
	year: number
}

export class DayTradesByProfUseCase implements UseCase<Prof, workedDays> {
	constructor(private readonly managerProfs: ProfManagerInterface) { }

	public async execute(prof: Prof): PromiseEither<AbstractError, number> {
		const data = await getHolidayByMonth(prof.month, prof.year.toLocaleString())

		const profOrErr = await this.managerProfs.findByID(prof._id, prof.unity_id)

		if (profOrErr.isLeft()) {
			return left(profOrErr.extract())
		}

		return right(0)
	}
}
