import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, right } from 'App/Core/shared'
import Unity from 'App/Models/Unity'
import { IHoliday } from 'Types/IHoliday'
import { HolidaysManagerInterface } from '../interface/holidays.interface'

export class HolidaysMongoRepository implements HolidaysManagerInterface {
	constructor() { }
	async findAllHolidays(unity_id: string): PromiseEither<AbstractError, IHoliday[]> {
		const unity = await Unity.findById(unity_id).select('holidays')

		const holidays = unity?.holidays || []

		return right(holidays)
	}
	saveHolidays: (
		unity_id: string,
		holidays: IHoliday[],
	) => PromiseEither<AbstractError, IHoliday[]>
	deleteHoliday: (unity_id: string, id: string) => PromiseEither<AbstractError, void>
	addHoliday: (
		unity_id: string,
		holiday: IHoliday,
	) => PromiseEither<AbstractError, IHoliday>
}
