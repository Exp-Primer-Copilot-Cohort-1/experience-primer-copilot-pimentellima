/* eslint-disable @typescript-eslint/naming-convention */
import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IDaysOffice } from 'App/Types/IDaysOffice'
import { Entity } from '../abstract/entity.abstract'

class DaysOfTrade extends Entity implements IDaysOffice {
	exib_minutes: number
	hour_end: string
	hour_end_lunch: string
	hour_start: string
	hour_start_lunch: string
	is_friday: boolean
	is_monday: boolean
	is_saturday: boolean
	is_sunday: boolean
	is_thursday: boolean
	is_tuesday: boolean
	is_wednesday: boolean
	lunch_time_active: boolean

	public defineExibMinutes(exib_minutes = 30): this {
		this.exib_minutes = exib_minutes
		return this
	}

	public defineHourEnd(hour_end = ''): this {
		this.hour_end = hour_end
		return this
	}

	public defineHourEndLunch(hour_end_lunch = ''): this {
		this.hour_end_lunch = hour_end_lunch
		return this
	}

	public defineHourStart(hour_start = ''): this {
		this.hour_start = hour_start
		return this
	}

	public defineHourStartLunch(hour_start_lunch = ''): this {
		this.hour_start_lunch = hour_start_lunch
		return this
	}

	public defineIsFriday(is_friday = false): this {
		this.is_friday = is_friday
		return this
	}

	public defineIsMonday(is_monday = false): this {
		this.is_monday = is_monday
		return this
	}

	public defineIsSaturday(is_saturday = false): this {
		this.is_saturday = is_saturday
		return this
	}

	public defineIsSunday(is_sunday = false): this {
		this.is_sunday = is_sunday
		return this
	}

	public defineIsThursday(is_thursday = false): this {
		this.is_thursday = is_thursday
		return this
	}

	public defineIsTuesday(is_tuesday = false): this {
		this.is_tuesday = is_tuesday
		return this
	}

	public defineIsWednesday(is_wednesday = false): this {
		this.is_wednesday = is_wednesday
		return this
	}

	public defineLunchTimeActive(lunch_time_active = false): this {
		this.lunch_time_active = lunch_time_active
		return this
	}

	static async build(
		daysOfTrade = {} as IDaysOffice,
	): PromiseEither<AbstractError, DaysOfTrade> {
		try {
			return right(
				new DaysOfTrade()
					.defineExibMinutes(daysOfTrade.exib_minutes)
					.defineHourEnd(daysOfTrade.hour_end)
					.defineHourEndLunch(daysOfTrade.hour_end_lunch)
					.defineHourStart(daysOfTrade.hour_start)
					.defineHourStartLunch(daysOfTrade.hour_start_lunch)
					.defineIsFriday(daysOfTrade.is_friday)
					.defineIsMonday(daysOfTrade.is_monday)
					.defineIsSaturday(daysOfTrade.is_saturday)
					.defineIsSunday(daysOfTrade.is_sunday)
					.defineIsThursday(daysOfTrade.is_thursday)
					.defineIsTuesday(daysOfTrade.is_tuesday)
					.defineIsWednesday(daysOfTrade.is_wednesday)
					.defineLunchTimeActive(daysOfTrade.lunch_time_active),
			)
		} catch (error) {
			return left(new AbstractError('', 400))
		}
	}
}

export default DaysOfTrade
