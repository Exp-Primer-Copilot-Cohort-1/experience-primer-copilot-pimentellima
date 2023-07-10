import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import HolidaysNationals from 'App/Models/HolidaysNationals'
import { IHoliday } from 'Types/IHoliday'
import { HolidaysNationalsManagerInterface } from '../interface/holidays-nationals.interface'

export class HolidaysNationalsMongoRepository
	implements HolidaysNationalsManagerInterface {
	constructor() { }
	async findAllHolidays(year: number): PromiseEither<AbstractError, IHoliday[]> {
		const holidaysNationals = await HolidaysNationals.findOne({
			year,
		}).select('holidays')

		if (!holidaysNationals) {
			return left(new AbstractError('Holidays not found', 404))
		}

		const holidays = holidaysNationals.holidays

		return right(holidays)
	}
	async saveHolidays(
		year: number,
		holidays: IHoliday[],
	): PromiseEither<AbstractError, IHoliday[]> {
		const holidaysNationals = await HolidaysNationals.findOne({
			year,
		})

		if (holidaysNationals) {
			return right(holidaysNationals.holidays)
		}

		await HolidaysNationals.create({
			year,
			holidays,
		})

		return right(holidays)
	}
}
