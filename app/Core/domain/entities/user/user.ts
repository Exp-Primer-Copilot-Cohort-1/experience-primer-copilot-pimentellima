/* eslint-disable @typescript-eslint/naming-convention */
import { IUser } from 'Types/IUser';
import { z } from 'zod';
import ValidateDocument from '../validations/document';
import ValidateEmail from '../validations/email';

class User implements IUser {
	public _id: string;
	public name: string;
	public email: string;
	public password: string;
	public unity_id: string;
	public type: string;
	public active: boolean;
	public avatar: string;
	public due_date: string;
	public created_at: Date;
	public updated_at: Date;
	public schedule_obs: string;
	public show_lack: boolean;
	public rememberMeToken?: string;
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
	public celphone: string;
	public document: string;

	private constructor() { }

	public defineId(id: string): this {
		this._id = id;
		return this;
	}

	public defineName(name: string): this {
		const nameSchema = z.string().min(3).max(50);
		this.name = nameSchema.parse(name);
		return this;
	}

	public defineEmail(email: string): this {
		this.email = ValidateEmail.build(email).email;
		return this;
	}

	public definePassword(password: string): this {
		const passwordSchema = z
			.string()
			.min(6)
			.max(50)
			.regex(/[a-zA-Z]/)
			.regex(/[0-9]/);
		this.password = password;
		return this;
	}

	public defineUnityId(unity_id: string): this {
		if (!unity_id) {
			throw new Error('Unity id is required');
		}

		this.unity_id = unity_id;
		return this;
	}

	public defineType(type: string): this {
		this.type = type;
		return this;
	}

	public defineActive(active: boolean = false): this {
		this.active = active;
		return this;
	}

	public defineAvatar(avatar: string): this {
		this.avatar = avatar;
		return this;
	}

	public defineDueDate(due_date: string): this {
		this.due_date = due_date;
		return this;
	}

	public defineCreatedAt(created_at: Date): this {
		this.created_at = created_at;
		return this;
	}

	public defineUpdatedAt(updated_at: Date): this {
		this.updated_at = updated_at;
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
		this.exib_minutes = exib_minutes;
		return this;
	}

	public defineHourEnd(hour_end: string): this {
		this.hour_end = hour_end;
		return this;
	}

	public defineHourEndLunch(hour_end_lunch: string): this {
		this.hour_end_lunch = hour_end_lunch;
		return this;
	}

	public defineHourStart(hour_start: string): this {
		this.hour_start = hour_start;
		return this;
	}

	public defineHourStartLunch(hour_start_lunch: string): this {
		this.hour_start_lunch = hour_start_lunch;
		return this;
	}

	public defineIsFriday(is_friday: boolean): this {
		this.is_friday = is_friday;
		return this;
	}

	public defineIsMonday(is_monday: boolean): this {
		this.is_monday = is_monday;
		return this;
	}

	public defineIsSaturday(is_saturday: boolean): this {
		this.is_saturday = is_saturday;
		return this;
	}

	public defineIsSunday(is_sunday: boolean): this {
		this.is_sunday = is_sunday;
		return this;
	}

	public defineIsThursday(is_thursday: boolean): this {
		this.is_thursday = is_thursday;
		return this;
	}

	public defineIsTuesday(is_tuesday: boolean): this {
		this.is_tuesday = is_tuesday;
		return this;
	}

	public defineIsWednesday(is_wednesday: boolean): this {
		this.is_wednesday = is_wednesday;
		return this;
	}

	public defineLunchTimeActive(lunch_time_active: boolean): this {
		this.lunch_time_active = lunch_time_active;
		return this;
	}

	public defineCelphone(celphone: string): this {
		this.celphone = celphone;
		return this;
	}

	public defineDocument(document: string): this {
		this.document = ValidateDocument.build(document).document;
		return this;
	}

	public params(): IUser {
		return Object.assign({}, this);
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
			schedule_obs,
			show_lack,
			type,
			unity_id,
			updated_at,
			rememberMeToken,
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
			.defineLunchTimeActive(lunch_time_active)
			.defineScheduleObs(schedule_obs)
			.defineShowLack(show_lack)
			.defineType(type)
			.defineUnityId(unity_id.toString())
			.defineUpdatedAt(updated_at)
			.defineRememberMeToken(rememberMeToken);
	}
}

export default User;
