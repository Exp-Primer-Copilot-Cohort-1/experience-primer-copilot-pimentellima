import DaysOfTrade from '../helpers/days-of-trade'
import { AbstractUser } from './user.abstract'

export abstract class SystemUser extends AbstractUser {
	private _date_expiration: string
	private _password: string
	private _active: boolean
	private _dayOfTrade: DaysOfTrade

	public get type(): 'admin' | 'admin_prof' | 'prof' | 'sec' {
		return this._type as 'admin' | 'admin_prof' | 'prof' | 'sec'
	}

	public get dayOfTrade(): DaysOfTrade {
		return this._dayOfTrade
	}

	public get date_expiration(): string {
		return this._date_expiration
	}

	public get password(): string {
		return this._password
	}

	public get active(): boolean {
		return this._active
	}

	public defineDateExpiration(date_expiration: string): this {
		this._date_expiration = date_expiration
		return this
	}

	public definePassword(password: string): this {
		this._password = password
		return this
	}

	public defineActive(active = false): this {
		this._active = active
		return this
	}

	public defineDayOfTrade(dayOfTrade: DaysOfTrade): this {
		if (!dayOfTrade) {
			return this
		}
		this._dayOfTrade = dayOfTrade

		return this
	}

	public get exib_minutes(): number {
		return this._dayOfTrade?.exib_minutes
	}

	public get hour_end(): string {
		return this._dayOfTrade?.hour_end
	}
	public get hour_end_lunch(): string {
		return this._dayOfTrade?.hour_end_lunch
	}
	public get hour_start(): string {
		return this._dayOfTrade?.hour_start
	}
	public get hour_start_lunch(): string {
		return this._dayOfTrade?.hour_start_lunch
	}
	public get is_friday(): boolean {
		return this._dayOfTrade?.is_friday
	}
	public get is_monday(): boolean {
		return this._dayOfTrade?.is_monday
	}
	public get is_saturday(): boolean {
		return this._dayOfTrade?.is_saturday
	}
	public get is_sunday(): boolean {
		return this._dayOfTrade?.is_sunday
	}
	public get is_thursday(): boolean {
		return this._dayOfTrade?.is_thursday
	}
	public get is_tuesday(): boolean {
		return this._dayOfTrade?.is_tuesday
	}
	public get is_wednesday(): boolean {
		return this._dayOfTrade?.is_wednesday
	}

	public get lunch_time_active(): boolean {
		return this._dayOfTrade?.lunch_time_active
	}

	public defineExibMinutes(exib_minutes: number): this {
		this._dayOfTrade?.defineExibMinutes(exib_minutes)
		return this
	}

	public defineHourEnd(hour_end: string): this {
		this._dayOfTrade?.defineHourEnd(hour_end)
		return this
	}

	public defineHourEndLunch(hour_end_lunch: string): this {
		this._dayOfTrade?.defineHourEndLunch(hour_end_lunch)
		return this
	}

	public defineHourStart(hour_start: string): this {
		this._dayOfTrade?.defineHourStart(hour_start)
		return this
	}

	public defineHourStartLunch(hour_start_lunch: string): this {
		this._dayOfTrade?.defineHourStartLunch(hour_start_lunch)
		return this
	}

	public defineIsFriday(is_friday: boolean): this {
		this._dayOfTrade?.defineIsFriday(is_friday)
		return this
	}

	public defineIsMonday(is_monday: boolean): this {
		this._dayOfTrade?.defineIsMonday(is_monday)
		return this
	}

	public defineIsSaturday(is_saturday: boolean): this {
		this._dayOfTrade?.defineIsSaturday(is_saturday)
		return this
	}

	public defineIsSunday(is_sunday: boolean): this {
		this._dayOfTrade?.defineIsSunday(is_sunday)
		return this
	}

	public defineIsThursday(is_thursday: boolean): this {
		this._dayOfTrade?.defineIsThursday(is_thursday)
		return this
	}

	public defineIsTuesday(is_tuesday: boolean): this {
		this._dayOfTrade?.defineIsTuesday(is_tuesday)
		return this
	}

	public defineIsWednesday(is_wednesday: boolean): this {
		this._dayOfTrade?.defineIsWednesday(is_wednesday)
		return this
	}

	public defineLunchTimeActive(lunch_time_active: boolean): this {
		this._dayOfTrade?.defineLunchTimeActive(lunch_time_active)
		return this
	}
}
