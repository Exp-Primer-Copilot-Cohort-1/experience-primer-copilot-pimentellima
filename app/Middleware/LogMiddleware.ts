import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { colorize } from 'App/Core/adapters/controller/helpers/colorize'
import Log from '../../config/log'

class LogMiddleware {
	public async handle({ request }: HttpContextContract, next) {
		console.log(colorize(0, request.url(), request.method() as any))
		Log.info(`${new Date().toISOString()} -  ${request.url()}`)
		await next()
	}
}

export default LogMiddleware
