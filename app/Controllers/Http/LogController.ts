import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Log from 'App/Models/Log'

class LogController {
	async index(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id

		const logs = await Log.find({ unity_id }).sort({ createdAt: -1 })

		return logs
	}

	async show(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id
		const { id } = ctx.params

		const logs = await Log.find({ collection_id: id, unity_id })

		if (!logs) {
			return ctx.response.status(404).send({ error: 'Log not found' })
		}

		return logs
	}
}

export default LogController
