import { addDays } from 'date-fns'
import DaysOfTrade from '../helpers/days-of-trade'
import { AbstractUser } from './user.abstract'

export abstract class SystemUser extends AbstractUser {
	date_expiration: string
	password: string
	active: boolean
	dayOfTrade: DaysOfTrade

	public defineDateExpiration(date_expiration?: string): this {
		if (!date_expiration) {
			this.date_expiration = addDays(new Date(), 5).toISOString()
			return this
		}

		this.date_expiration = date_expiration
		return this
	}

	public definePassword(password: string): this {
		this.password = password
		return this
	}

	public defineActive(active = false): this {
		this.active = active
		return this
	}

	public defineDayOfTrade(dayOfTrade: DaysOfTrade): this {
		if (!dayOfTrade) {
			return this
		}
		this.dayOfTrade = dayOfTrade

		return this
	}

	public get exib_minutes(): number {
		return this.dayOfTrade?.exib_minutes
	}

	public get hour_end(): string {
		return this.dayOfTrade?.hour_end
	}
	public get hour_end_lunch(): string {
		return this.dayOfTrade?.hour_end_lunch
	}
	public get hour_start(): string {
		return this.dayOfTrade?.hour_start
	}
	public get hour_start_lunch(): string {
		return this.dayOfTrade?.hour_start_lunch
	}
	public get is_friday(): boolean {
		return this.dayOfTrade?.is_friday
	}
	public get is_monday(): boolean {
		return this.dayOfTrade?.is_monday
	}
	public get is_saturday(): boolean {
		return this.dayOfTrade?.is_saturday
	}
	public get is_sunday(): boolean {
		return this.dayOfTrade?.is_sunday
	}
	public get is_thursday(): boolean {
		return this.dayOfTrade?.is_thursday
	}
	public get is_tuesday(): boolean {
		return this.dayOfTrade?.is_tuesday
	}
	public get is_wednesday(): boolean {
		return this.dayOfTrade?.is_wednesday
	}

	public get lunch_time_active(): boolean {
		return this.dayOfTrade?.lunch_time_active
	}

	public defineExibMinutes(exib_minutes = 0): this {
		this.dayOfTrade?.defineExibMinutes(exib_minutes)
		return this
	}

	public defineHourEnd(hour_end: string): this {
		this.dayOfTrade?.defineHourEnd(hour_end)
		return this
	}

	public defineHourEndLunch(hour_end_lunch: string): this {
		this.dayOfTrade?.defineHourEndLunch(hour_end_lunch)
		return this
	}

	public defineHourStart(hour_start: string): this {
		this.dayOfTrade?.defineHourStart(hour_start)
		return this
	}

	public defineHourStartLunch(hour_start_lunch: string): this {
		this.dayOfTrade?.defineHourStartLunch(hour_start_lunch)
		return this
	}

	public defineIsFriday(is_friday: boolean): this {
		this.dayOfTrade?.defineIsFriday(is_friday)
		return this
	}

	public defineIsMonday(is_monday: boolean): this {
		this.dayOfTrade?.defineIsMonday(is_monday)
		return this
	}

	public defineIsSaturday(is_saturday: boolean): this {
		this.dayOfTrade?.defineIsSaturday(is_saturday)
		return this
	}

	public defineIsSunday(is_sunday: boolean): this {
		this.dayOfTrade?.defineIsSunday(is_sunday)
		return this
	}

	public defineIsThursday(is_thursday: boolean): this {
		this.dayOfTrade?.defineIsThursday(is_thursday)
		return this
	}

	public defineIsTuesday(is_tuesday: boolean): this {
		this.dayOfTrade?.defineIsTuesday(is_tuesday)
		return this
	}

	public defineIsWednesday(is_wednesday: boolean): this {
		this.dayOfTrade?.defineIsWednesday(is_wednesday)
		return this
	}

	public defineLunchTimeActive(lunch_time_active: boolean): this {
		this.dayOfTrade?.defineLunchTimeActive(lunch_time_active)
		return this
	}
}
