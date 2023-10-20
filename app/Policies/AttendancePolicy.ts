import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import Activity from 'App/Models/Activity'
import { IUser } from 'App/Types/IUser'

export default class AttendancePolicy extends BasePolicy {
	async start(user: IUser, activity_id: string) {
		const activity = await Activity.findById(activity_id).orFail()
		return user._id.toString() === activity.prof.toString()
	}

	async stop(user: IUser, activity_id: string) {
		const activity = await Activity.findById(activity_id).orFail()
		return user._id.toString() === activity.prof.toString()
	}
}
