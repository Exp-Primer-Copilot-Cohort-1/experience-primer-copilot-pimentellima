import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { ROLES } from 'App/Roles/types'
import { IAdminUser } from 'Types/IAdminUser'
import { SystemUser } from '../abstract/system-user.abstract'
import DaysOfTrade from '../helpers/days-of-trade'

class AdminUser extends SystemUser implements IAdminUser {
	protected _type: ROLES.ADMIN | ROLES.ADMIN_PROF

	private constructor() {
		super()
	}

	public get type(): ROLES.ADMIN | ROLES.ADMIN_PROF {
		return this._type
	}

	public defineType(type: ROLES.ADMIN | ROLES.ADMIN_PROF): this {
		super.defineType(type)
		return this
	}

	public static async build(
		admin: IAdminUser,
	): PromiseEither<AbstractError, AdminUser> {
		const dayOfTradeEntityOrErr = await DaysOfTrade.build(admin.dayOfTrade)

		try {
			return right(
				new AdminUser()
					.defineId(admin?._id?.toString() || '')
					.defineName(admin?.name)
					.defineCelphone(admin?.celphone)
					.defineEmail(admin?.email)
					.defineDateExpiration(admin?.date_expiration)
					.defineDocument(admin?.document)
					.definePassword(admin?.password)
					.defineUnityId(admin?.unity_id)
					.defineType(admin?.type as ROLES.ADMIN | ROLES.ADMIN_PROF)
					.defineDayOfTrade(dayOfTradeEntityOrErr.extract() as DaysOfTrade)
					.defineActive(admin?.active)
					.defineCreatedAt(admin?.created_at)
					.defineUpdatedAt(admin?.updated_at)
					.defineAvatar(admin?.avatar),
			)
		} catch (error) {
			return left(error)
		}
	}
}

export default AdminUser
