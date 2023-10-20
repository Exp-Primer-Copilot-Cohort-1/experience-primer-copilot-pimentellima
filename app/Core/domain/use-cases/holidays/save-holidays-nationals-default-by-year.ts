import { HolidaysNationalsManagerInterface } from 'App/Core/domain/repositories/interface/holidays-nationals.interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IHoliday } from 'App/Types/IHoliday'
import { fetchHolidays } from '../helpers/holidays'

type Year = number

export class SaveHolidaysNationalsDefaultUseCase implements UseCase<Year, IHoliday[]> {
	constructor(
		private readonly holidaysNationalsRepository: HolidaysNationalsManagerInterface,
	) { }

	public async execute(year: Year): PromiseEither<AbstractError, IHoliday[]> {
		if (!year) return left(new AbstractError('Year is required', 400))

		const holidaysOrErr = await this.holidaysNationalsRepository.findAllHolidays(year)

		if (holidaysOrErr.isRight()) {
			return right(holidaysOrErr.extract())
		}

		const holidays = await fetchHolidays(year)

		const holidaysNationalsOrErr =
			await this.holidaysNationalsRepository.saveHolidays(year, holidays)

		if (holidaysNationalsOrErr.isLeft()) {
			return left(new AbstractError('Error to save holidays nationals', 400))
		}

		return right(holidaysNationalsOrErr.extract())
	}
}
