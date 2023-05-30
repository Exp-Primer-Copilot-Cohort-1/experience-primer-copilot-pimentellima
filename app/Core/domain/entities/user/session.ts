import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import type { IUser } from 'Types/IUser'
import { UserNotValidError } from '../../errors/user-not-valid'
import { SystemUser } from '../abstract/system-user.abstract'
import ExtractValueEntitiesValidations from '../decorators/extract-value-entities-validations'
import DaysOfTrade from '../helpers/days-of-trade'

export class SessionUser extends SystemUser {
	private _due_date: string
	private _schedule_obs: string
	private _show_lack: boolean
	private _rememberMeToken?: string

	private constructor() {
		super()
	}

	public get due_date(): string {
		return this._due_date
	}

	public get schedule_obs(): string {
		return this._schedule_obs
	}

	public get show_lack(): boolean {
		return this._show_lack
	}

	public get rememberMeToken(): string | undefined {
		return this._rememberMeToken
	}

	public defineDueDate(due_date: string): this {
		this._due_date = due_date
		return this
	}

	public defineScheduleObs(schedule_obs: string): this {
		this._schedule_obs = schedule_obs
		return this
	}

	public defineShowLack(show_lack: boolean): this {
		this._show_lack = show_lack
		return this
	}

	public defineRememberMeToken(rememberMeToken?: string): this {
		this._rememberMeToken = rememberMeToken
		return this
	}

	@ExtractValueEntitiesValidations
	public static async build(data: IUser): PromiseEither<AbstractError, SessionUser> {
		try {
			const daysOfTradeOrErr = await DaysOfTrade.build(data)

			const user = new SessionUser()
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
				.defineRememberMeToken(data.rememberMeToken)
				.defineReports(data?.reports)
				.defineScreens(data?.screens)
				.definePermissions(data?.permissions)
				.defineBlackListPermissions(data?.blackListPermissions)
				.defineBlackListReports(data?.blackListReports)
				.defineBlackListScreens(data?.blackListScreens)

			return right(user)
		} catch (error) {
			return left(new UserNotValidError(error))
		}
	}
}

export default SessionUser
