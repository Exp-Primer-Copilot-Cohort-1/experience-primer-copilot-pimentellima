import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import Unity from 'App/Models/Unity'
import { IHoliday } from 'App/Types/IHoliday'
import { HolidaysManagerInterface } from '../interface/holidays.interface'

export class HolidaysMongoRepository implements HolidaysManagerInterface {
	constructor() { }
	async findAllHolidays(unity_id: string): PromiseEither<AbstractError, IHoliday[]> {
		const unity = await Unity.findById(unity_id).select('holidays')

		const holidays = unity?.holidays || []

		return right(holidays)
	}

	async deleteHoliday(
		unity_id: string,
		id: string,
	): PromiseEither<AbstractError, IHoliday[]> {
		const unity = await Unity.findByIdAndUpdate(
			unity_id,
			{
				$pull: { holidays: { _id: id } },
			},
			{ new: true, useFindAndModify: false },
		)
			.select('holidays')
			.exec()

		return right(unity?.holidays || [])
	}
	async addHoliday(
		unity_id: string,
		holiday: IHoliday,
	): PromiseEither<AbstractError, IHoliday> {
		const unity = await Unity.findByIdAndUpdate(
			unity_id,
			{
				$push: { holidays: holiday },
			},
			{ new: true, useFindAndModify: false },
		).select('holidays')

		const holidayId = unity?.holidays?.find(
			(holiday) => holiday.name === holiday.name && holiday.date === holiday.date,
		)

		if (!holidayId) {
			return left(new AbstractError('Holiday not added', 400))
		}

		return right(holidayId)
	}
}
