/* eslint-disable @typescript-eslint/naming-convention */
import { IDaysOffice } from 'Types/IDaysOffice';

class DaysOfTrade implements IDaysOffice {
	public exib_minutes: number;
	public hour_end: string;
	public hour_end_lunch: string;
	public hour_start: string;
	public hour_start_lunch: string;
	public is_friday: boolean;
	public is_monday: boolean;
	public is_saturday: boolean;
	public is_sunday: boolean;
	public is_thursday: boolean;
	public is_tuesday: boolean;
	public is_wednesday: boolean;
	public lunch_time_active: boolean;

	constructor() { }

	public defineExibMinutes(exib_minutes: number = 0): this {
		this.exib_minutes = exib_minutes;
		return this;
	}

	public defineHourEnd(hour_end: string = ''): this {
		this.hour_end = hour_end;
		return this;
	}

	public defineHourEndLunch(hour_end_lunch: string = ''): this {
		this.hour_end_lunch = hour_end_lunch;
		return this;
	}

	public defineHourStart(hour_start: string = ''): this {
		this.hour_start = hour_start;
		return this;
	}

	public defineHourStartLunch(hour_start_lunch: string = ''): this {
		this.hour_start_lunch = hour_start_lunch;
		return this;
	}

	public defineIsFriday(is_friday: boolean = false): this {
		this.is_friday = is_friday;
		return this;
	}

	public defineIsMonday(is_monday: boolean = false): this {
		this.is_monday = is_monday;
		return this;
	}

	public defineIsSaturday(is_saturday: boolean = false): this {
		this.is_saturday = is_saturday;
		return this;
	}

	public defineIsSunday(is_sunday: boolean = false): this {
		this.is_sunday = is_sunday;
		return this;
	}

	public defineIsThursday(is_thursday: boolean = false): this {
		this.is_thursday = is_thursday;
		return this;
	}

	public defineIsTuesday(is_tuesday: boolean = false): this {
		this.is_tuesday = is_tuesday;
		return this;
	}

	public defineIsWednesday(is_wednesday: boolean = false): this {
		this.is_wednesday = is_wednesday;
		return this;
	}

	public defineLunchTimeActive(lunch_time_active: boolean = false): this {
		this.lunch_time_active = lunch_time_active;
		return this;
	}

	public params(): IDaysOffice {
		return Object.assign({}, this);
	}

	public static build(daysOfTrade: IDaysOffice): DaysOfTrade {
		const {
			exib_minutes,
			hour_end,
			hour_end_lunch,
			hour_start,
			hour_start_lunch,
			is_friday,
			is_monday,
			is_saturday,
			is_sunday,
			is_thursday,
			is_tuesday,
			is_wednesday,
			lunch_time_active,
		} = daysOfTrade;

		return new DaysOfTrade()
			.defineExibMinutes(exib_minutes)
			.defineHourEnd(hour_end)
			.defineHourEndLunch(hour_end_lunch)
			.defineHourStart(hour_start)
			.defineHourStartLunch(hour_start_lunch)
			.defineIsFriday(is_friday)
			.defineIsMonday(is_monday)
			.defineIsSaturday(is_saturday)
			.defineIsSunday(is_sunday)
			.defineIsThursday(is_thursday)
			.defineIsTuesday(is_tuesday)
			.defineIsWednesday(is_wednesday)
			.defineLunchTimeActive(lunch_time_active);
		// .verifyHoursOfTrade(unit);
	}
}

export default DaysOfTrade;
