import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import BusinessFranchises from 'App/Models/BusinessFranchises'
import { ROLES } from 'App/Roles/types'
import { IUser } from 'App/Types/IUser'

const general = [
	ROLES.SUPERADMIN,
	ROLES.FRANCHISEE_ADMIN,
]

export default class BusinessFranchisesPolicy extends BasePolicy {
	public async viewList(user: IUser) {
		const permission = await BusinessFranchises.findOne({
			$and: [{
				$or: [
					{
						admins: user._id
					},
					{
						superAdmins: user._id
					}
				]
			}]
		})

		return general.includes(user.type as ROLES) && !!permission
	}

}
