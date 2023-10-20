import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProfileEntity from 'App/Core/domain/entities/profile/profile'
import Profile from 'App/Models/Profile'
import { ROLES } from 'App/Roles/types'
import { IProfile } from 'App/Types/IUser'

class ProfileController {
	async show({ auth }: HttpContextContract) {
		const userLogger = auth.user

		const user = await Profile.findById(userLogger?._id).select('-password').orFail()

		return user
	}

	async update({ auth, request, response }: HttpContextContract) {
		const data = request.all() as IProfile
		const userLogger = auth.user

		const profileOrErr = await ProfileEntity.build({
			...userLogger,
			...data,
			type: userLogger?.type as ROLES,
			_id: userLogger?._id.toString() as string,
			unity_id: userLogger?.unity_id as string,
		})

		if (profileOrErr.isLeft()) {
			return response.badRequest(profileOrErr.extract().message)
		}

		const profile = profileOrErr.extract()

		const user = await Profile.findByIdAndUpdate(userLogger?._id, profile, {
			new: true,
		}).orFail()

		return user
	}
}
export default ProfileController
