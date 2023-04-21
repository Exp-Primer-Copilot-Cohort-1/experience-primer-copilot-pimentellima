/* eslint-disable @typescript-eslint/naming-convention */
import { AbstractError } from 'App/Core/errors/error.interface';
import { PromiseEither, left, right } from 'App/Core/shared';
import { IUser } from 'Types/IUser';
import { UserNotValidError } from '../../errors/user-not-valid';
import { SystemUser } from '../abstract/system-user.abstract';
import DaysOfTrade from '../helpers/days-of-trade';

class SesssionUser extends SystemUser {
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
			email: this.email,
			document: this.document,
		};
	}

	public static async build(
		data: IUser,
	): PromiseEither<AbstractError, SesssionUser> {
		try {
			const daysOfTrade = DaysOfTrade.build(data);
			const user = new SesssionUser()
				.defineId(data._id)
				.defineName(data.name)
				.defineEmail(data.email)
				.definePassword(data.password)
				.defineActive(data.active)
				.defineAvatar(data.avatar)
				.defineCreatedAt(data.created_at)
				.defineDueDate(data.due_date)
				.defineDayOfTrade(daysOfTrade)
				.defineDocument(data.document)
				.defineCelphone(data.celphone)
				.defineScheduleObs(data.schedule_obs)
				.defineShowLack(data.show_lack)
				.defineType(data.type)
				.defineUnityId(data.unity_id.toString())
				.defineUpdatedAt(data.updated_at)
				.defineRememberMeToken(data.rememberMeToken);

			return right(user);
		} catch (error) {
			return left(new UserNotValidError(error));
		}
	}
}

export default SesssionUser;
