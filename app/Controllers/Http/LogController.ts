import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import generateLogModel from 'App/Models/Log'

class LogController {
	async index(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id

		if (!unity_id) {
			return ctx.response.status(401).send({ error: 'Unauthorized' })
		}

		const Log = await generateLogModel(unity_id?.toString())

		const logs = await Log.find({ unity_id }).sort({ createdAt: -1 })

		return logs
	}

	async show(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id
		const { id } = ctx.params

		if (!unity_id) {
			return ctx.response.status(401).send({ error: 'Unauthorized' })
		}

		const Log = await generateLogModel(unity_id?.toString())
		const logs = await Log.find({ collection_id: id, unity_id })

		if (!logs) {
			return ctx.response.status(404).send({ error: 'Log not found' })
		}

		return logs
	}
}

export default LogController
