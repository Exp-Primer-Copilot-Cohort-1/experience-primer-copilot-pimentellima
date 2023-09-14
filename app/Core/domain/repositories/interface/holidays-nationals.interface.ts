import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { IHoliday } from 'App/Types/IHoliday'

export interface HolidaysNationalsManagerInterface {
	findAllHolidays: (year: number) => PromiseEither<AbstractError, IHoliday[]>
	saveHolidays: (
		year: number,
		holidays: IHoliday[],
	) => PromiseEither<AbstractError, IHoliday[]>
}
