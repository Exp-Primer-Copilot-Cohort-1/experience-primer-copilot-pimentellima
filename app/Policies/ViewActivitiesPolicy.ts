import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import { ROLES } from 'App/Roles/types'
import { IActivity } from 'App/Types/IActivity'
import { IUser } from 'App/Types/IUser'

const general = [
	ROLES.ADMIN,
	ROLES.SUPERADMIN,
	ROLES.ADMIN_PROF,
	ROLES.DR_PERFORMANCE,
	ROLES.SEC,
]
export default class ViewActivitiesPolicy extends BasePolicy {
	public async viewList(user: IUser) {
		return general.includes(user.type as ROLES)
	}
	public async view(user: IUser, activity: IActivity) {
		return user._id === activity.prof
	}
}
