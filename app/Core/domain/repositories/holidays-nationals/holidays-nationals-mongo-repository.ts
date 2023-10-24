import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import HolidaysNationals from 'App/Models/HolidaysNationals'
import { IHoliday } from 'App/Types/IHoliday'
import { injectable, registry } from 'tsyringe'
import { HolidaysNationalsManagerContract } from '../interface/holidays-nationals.interface'


@injectable()
@registry([{ token: HolidaysNationalsMongoRepository, useClass: HolidaysNationalsMongoRepository }])
export class HolidaysNationalsMongoRepository
	implements HolidaysNationalsManagerContract {
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
