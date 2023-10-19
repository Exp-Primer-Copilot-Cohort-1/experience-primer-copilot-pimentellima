import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import { ROLES } from 'App/Roles/types'
import { IUser } from 'App/Types/IUser'

const general = [
	ROLES.ADMIN,
	ROLES.SUPERADMIN,
	ROLES.ADMIN_PROF,
	ROLES.FRANCHISEE_ADMIN,
]

export default class UsersPolicy extends BasePolicy {
	async resend(user: IUser) {
		return general.includes(user.type as ROLES)
	}
}
