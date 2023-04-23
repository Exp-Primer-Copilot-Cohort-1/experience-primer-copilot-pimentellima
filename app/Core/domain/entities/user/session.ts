/* eslint-disable @typescript-eslint/naming-convention */
import { AbstractError } from 'App/Core/errors/error.interface';
import { PromiseEither, left, right } from 'App/Core/shared';
import { IUser } from 'Types/IUser';
import { UserNotValidError } from '../../errors/user-not-valid';
import { SystemUser } from '../abstract/system-user.abstract';
import DaysOfTrade from '../helpers/days-of-trade';

class SesssionUser extends SystemUser {
	private _due_date: string;
	private _schedule_obs: string;
	private _show_lack: boolean;
	private _rememberMeToken?: string;

	public get due_date(): string {
		return this._due_date;
	}

	public get schedule_obs(): string {
		return this._schedule_obs;
	}

	public get show_lack(): boolean {
		return this._show_lack;
	}

	public get rememberMeToken(): string | undefined {
		return this._rememberMeToken;
	}

	public defineDueDate(due_date: string): this {
		this._due_date = due_date;
		return this;
	}

	public defineScheduleObs(schedule_obs: string): this {
		this._schedule_obs = schedule_obs;
		return this;
	}

	public defineShowLack(show_lack: boolean): this {
		this._show_lack = show_lack;
		return this;
	}

	public defineRememberMeToken(rememberMeToken?: string): this {
		this._rememberMeToken = rememberMeToken;
		return this;
	}

	public static async build(
		data: IUser,
	): PromiseEither<AbstractError, SesssionUser> {
		try {
			const daysOfTradeOrErr = await DaysOfTrade.build(data);

			const user = new SesssionUser()
				.defineId(data._id)
				.defineName(data.name)
				.defineEmail(data.email)
				.definePassword(data.password)
				.defineActive(data.active)
				.defineAvatar(data.avatar)
				.defineCreatedAt(data.created_at)
				.defineDueDate(data.due_date)
				.defineDayOfTrade(daysOfTradeOrErr.extract() as DaysOfTrade)
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
