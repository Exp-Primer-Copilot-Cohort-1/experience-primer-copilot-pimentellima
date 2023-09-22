import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { ROLES } from 'App/Roles/types'
import type { IUser } from 'App/Types/IUser'
import { UserNotValidError } from '../../errors/user-not-valid'
import { SystemUser } from '../abstract/system-user.abstract'
import DaysOfTrade from '../helpers/days-of-trade'

export class SessionUser extends SystemUser {
	due_date: string
	schedule_obs: string
	show_lack: boolean
	rememberMeToken?: string

	private constructor() {
		super()
	}

	public defineDueDate(due_date: string): this {
		this.due_date = due_date
		return this
	}

	public defineScheduleObs(schedule_obs: string): this {
		this.schedule_obs = schedule_obs
		return this
	}

	public defineShowLack(show_lack: boolean): this {
		this.show_lack = show_lack
		return this
	}

	public defineRememberMeToken(rememberMeToken?: string): this {
		this.rememberMeToken = rememberMeToken
		return this
	}

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
				.defineType(data.type as ROLES)
				.defineUnityId(data.unity_id.toString())
				.defineUpdatedAt(data.updated_at)
				.defineRememberMeToken(data.rememberMeToken)
				.definePermissions(data?.permissions)
				.defineBlacklist(data?.blacklist)

			return right(user)
		} catch (error) {
			return left(new UserNotValidError(error))
		}
	}
}

export default SessionUser
