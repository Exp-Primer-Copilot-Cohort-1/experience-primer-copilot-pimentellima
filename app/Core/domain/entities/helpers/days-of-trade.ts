/* eslint-disable @typescript-eslint/naming-convention */
import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IDaysOffice } from 'Types/IDaysOffice'
import { Entity } from '../abstract/entity.abstract'

class DaysOfTrade extends Entity implements IDaysOffice {
	private _exib_minutes: number
	private _hour_end: string
	private _hour_end_lunch: string
	private _hour_start: string
	private _hour_start_lunch: string
	private _is_friday: boolean
	private _is_monday: boolean
	private _is_saturday: boolean
	private _is_sunday: boolean
	private _is_thursday: boolean
	private _is_tuesday: boolean
	private _is_wednesday: boolean
	private _lunch_time_active: boolean

	public get exib_minutes(): number {
		return this._exib_minutes
	}

	public get hour_end(): string {
		return this._hour_end
	}

	public get hour_end_lunch(): string {
		return this._hour_end_lunch
	}

	public get hour_start(): string {
		return this._hour_start
	}

	public get hour_start_lunch(): string {
		return this._hour_start_lunch
	}

	public get is_friday(): boolean {
		return this._is_friday
	}

	public get is_monday(): boolean {
		return this._is_monday
	}

	public get is_saturday(): boolean {
		return this._is_saturday
	}

	public get is_sunday(): boolean {
		return this._is_sunday
	}

	public get is_thursday(): boolean {
		return this._is_thursday
	}

	public get is_tuesday(): boolean {
		return this._is_tuesday
	}

	public get is_wednesday(): boolean {
		return this._is_wednesday
	}

	public get lunch_time_active(): boolean {
		return this._lunch_time_active
	}

	public defineExibMinutes(exib_minutes = 30): this {
		this._exib_minutes = exib_minutes
		return this
	}

	public defineHourEnd(hour_end = ''): this {
		this._hour_end = hour_end
		return this
	}

	public defineHourEndLunch(hour_end_lunch = ''): this {
		this._hour_end_lunch = hour_end_lunch
		return this
	}

	public defineHourStart(hour_start = ''): this {
		this._hour_start = hour_start
		return this
	}

	public defineHourStartLunch(hour_start_lunch = ''): this {
		this._hour_start_lunch = hour_start_lunch
		return this
	}

	public defineIsFriday(is_friday = false): this {
		this._is_friday = is_friday
		return this
	}

	public defineIsMonday(is_monday = false): this {
		this._is_monday = is_monday
		return this
	}

	public defineIsSaturday(is_saturday = false): this {
		this._is_saturday = is_saturday
		return this
	}

	public defineIsSunday(is_sunday = false): this {
		this._is_sunday = is_sunday
		return this
	}

	public defineIsThursday(is_thursday = false): this {
		this._is_thursday = is_thursday
		return this
	}

	public defineIsTuesday(is_tuesday = false): this {
		this._is_tuesday = is_tuesday
		return this
	}

	public defineIsWednesday(is_wednesday = false): this {
		this._is_wednesday = is_wednesday
		return this
	}

	public defineLunchTimeActive(lunch_time_active = false): this {
		this._lunch_time_active = lunch_time_active
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
