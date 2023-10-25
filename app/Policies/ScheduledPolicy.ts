import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import { ROLES } from 'App/Roles/types'
import { IDaysOffice } from 'App/Types/IDaysOffice'
import { IUser } from 'App/Types/IUser'

const general = [ROLES.ADMIN, ROLES.SUPERADMIN, ROLES.ADMIN_PROF, ROLES.FRANCHISEE_ADMIN, ROLES.SEC]
export default class ScheduledPolicy extends BasePolicy {
	async view(user: IUser, scheduled: IDaysOffice) {
		return user._id.toString() === scheduled._id.toString() || general.includes(user.type as ROLES)
	}

	async update(user: IUser, scheduled: IDaysOffice) {
		return user._id.toString() === scheduled._id.toString() || general.includes(user.type as ROLES)
	}
}
