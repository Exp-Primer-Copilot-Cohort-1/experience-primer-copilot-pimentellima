import { HolidayNotCreatedError } from 'App/Core/domain/errors/holiday-not-created'
import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import Unity from 'App/Models/Unity'
import { IHoliday } from 'App/Types/IHoliday'
import { injectable, registry } from 'tsyringe'
import { HolidaysManagerContract } from '../interface/holidays.interface'

@injectable()
@registry([{ token: HolidaysMongoRepository, useClass: HolidaysMongoRepository }])
export class HolidaysMongoRepository implements HolidaysManagerContract {
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
			{ new: true, upsert: true },

		).select('holidays')

		const holidayId = unity?.holidays?.find(
			(holiday) => holiday.name === holiday.name && holiday.date === holiday.date,
		)

		if (!holidayId) {
			return left(new HolidayNotCreatedError())
		}

		return right(holidayId)
	}
}
