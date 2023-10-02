import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import { ROLES } from 'App/Roles/types'
import { IUser } from 'App/Types/IUser'

const general = [
	ROLES.ADMIN,
	ROLES.SUPERADMIN,
	ROLES.ADMIN_PROF,
	ROLES.FRANCHISEE_ADMIN,
]

export default class UnitiesPolicy extends BasePolicy {
	async view(user: IUser) {
		return general.includes(user.type as ROLES)
	}

	async update(user: IUser) {
		return general.includes(user.type as ROLES)
	}
}
