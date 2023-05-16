import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IAdminUser } from 'Types/IAdminUser'
import { SystemUser } from '../abstract/system-user.abstract'
import DaysOfTrade from '../helpers/days-of-trade'

class AdminUser extends SystemUser implements IAdminUser {
	private _is_company: boolean
	protected _type: 'admin' | 'admin_prof'

	private constructor() {
		super()
	}

	public get type(): 'admin' | 'admin_prof' {
		return this._type
	}

	public get is_company(): boolean {
		return this._is_company
	}

	public defineType(type: 'admin' | 'admin_prof'): this {
		super.defineType(type)
		return this
	}

	public defineIsCompany(is_company = false): this {
		this._is_company = is_company
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
					.defineIsCompany(admin?.is_company)
					.defineDateExpiration(admin?.date_expiration)
					.defineDocument(admin?.document)
					.definePassword(admin?.password)
					.defineUnityId(admin?.unity_id)
					.defineType(admin?.type)
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
