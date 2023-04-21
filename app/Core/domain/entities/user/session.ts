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
