// const Mail = use('Mail');
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ScheduledConfig from 'App/Models/ScheduledConfig'
import { ROLES } from 'App/Roles/types'

class ScheduledConfigController {
	public async update({ params, request, auth }: HttpContextContract) {
		const userLogged = auth.user
		const data = request.all()
		const user = await ScheduledConfig.findById(params.id).orFail()
		const isEquals = params.id === userLogged?._id.toString()

		switch (userLogged?.type) {
			case ROLES.PROF:
				if (isEquals) {
					await user.update(data)
					await user.save()
				}
				break
			case ROLES.SEC:
				if (isEquals) {
					await user.update(data)
					await user.save()
				}
				break
			default:
				await user.update(data)
				await user.save()
				break
		}

		return user
	}
}

export default ScheduledConfigController
