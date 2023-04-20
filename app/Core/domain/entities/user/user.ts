/* eslint-disable @typescript-eslint/naming-convention */
import { IUser } from 'Types/IUser';
import { SystemUser } from '../abstract/system-user.abstract';

class User extends SystemUser implements IUser {
	public due_date: string;
	public schedule_obs: string;
	public show_lack: boolean;
	public rememberMeToken?: string;

	public get exib_minutes(): number {
		return this.dayOfTrade.exib_minutes;
	}

	public get hour_end(): string {
		return this.dayOfTrade.hour_end;
	}
	public get hour_end_lunch(): string {
		return this.dayOfTrade.hour_end_lunch;
	}
	public get hour_start(): string {
		return this.dayOfTrade.hour_start;
	}
	public get hour_start_lunch(): string {
		return this.dayOfTrade.hour_start_lunch;
	}
	public get is_friday(): boolean {
		return this.dayOfTrade.is_friday;
	}
	public get is_monday(): boolean {
		return this.dayOfTrade.is_monday;
	}
	public get is_saturday(): boolean {
		return this.dayOfTrade.is_saturday;
	}
	public get is_sunday(): boolean {
		return this.dayOfTrade.is_sunday;
	}
	public get is_thursday(): boolean {
		return this.dayOfTrade.is_thursday;
	}
	public get is_tuesday(): boolean {
		return this.dayOfTrade.is_tuesday;
	}
	public get is_wednesday(): boolean {
		return this.dayOfTrade.is_wednesday;
	}

	public get lunch_time_active(): boolean {
		return this.dayOfTrade.lunch_time_active;
	}

	constructor() {
		super();
	}

	public defineDueDate(due_date: string): this {
		this.due_date = due_date;
		return this;
	}

	public defineScheduleObs(schedule_obs: string): this {
		this.schedule_obs = schedule_obs;
		return this;
	}

	public defineShowLack(show_lack: boolean): this {
		this.show_lack = show_lack;
		return this;
	}

	public defineRememberMeToken(rememberMeToken?: string): this {
		this.rememberMeToken = rememberMeToken;
		return this;
	}

	public defineExibMinutes(exib_minutes: number): this {
		this.dayOfTrade?.defineExibMinutes(exib_minutes);
		return this;
	}

	public defineHourEnd(hour_end: string): this {
		this.dayOfTrade?.defineHourEnd(hour_end);
		return this;
	}

	public defineHourEndLunch(hour_end_lunch: string): this {
		this.dayOfTrade?.defineHourEndLunch(hour_end_lunch);
		return this;
	}

	public defineHourStart(hour_start: string): this {
		this.dayOfTrade?.defineHourStart(hour_start);
		return this;
	}

	public defineHourStartLunch(hour_start_lunch: string): this {
		this.dayOfTrade?.defineHourStartLunch(hour_start_lunch);
		return this;
	}

	public defineIsFriday(is_friday: boolean): this {
		this.dayOfTrade?.defineIsFriday(is_friday);
		return this;
	}

	public defineIsMonday(is_monday: boolean): this {
		this.dayOfTrade?.defineIsMonday(is_monday);
		return this;
	}

	public defineIsSaturday(is_saturday: boolean): this {
		this.dayOfTrade?.defineIsSaturday(is_saturday);
		return this;
	}

	public defineIsSunday(is_sunday: boolean): this {
		this.dayOfTrade?.defineIsSunday(is_sunday);
		return this;
	}

	public defineIsThursday(is_thursday: boolean): this {
		this.dayOfTrade?.defineIsThursday(is_thursday);
		return this;
	}

	public defineIsTuesday(is_tuesday: boolean): this {
		this.dayOfTrade?.defineIsTuesday(is_tuesday);
		return this;
	}

	public defineIsWednesday(is_wednesday: boolean): this {
		this.dayOfTrade?.defineIsWednesday(is_wednesday);
		return this;
	}

	public defineLunchTimeActive(lunch_time_active: boolean): this {
		this.dayOfTrade?.defineLunchTimeActive(lunch_time_active);
		return this;
	}

	public params(): IUser {
		const { dayOfTrade, ...user } = Object.assign({}, this);

		return {
			...user,
			...dayOfTrade.params(),
		};
	}

	public static build(user: IUser): User {
		const {
			_id,
			name,
			email,
			password,
			active,
			avatar,
			created_at,
			due_date,
			schedule_obs,
			show_lack,
			type,
			unity_id,
			updated_at,
			rememberMeToken,
			...dayOfTrade
		} = user;

		return new User()
			.defineId(_id)
			.defineName(name)
			.defineEmail(email)
			.definePassword(password)
			.defineActive(active)
			.defineAvatar(avatar)
			.defineCreatedAt(created_at)
			.defineDueDate(due_date)
			.defineDayOfTrade(dayOfTrade)
			.defineScheduleObs(schedule_obs)
			.defineShowLack(show_lack)
			.defineType(type)
			.defineUnityId(unity_id.toString())
			.defineUpdatedAt(updated_at)
			.defineRememberMeToken(rememberMeToken);
	}
}

export default User;
