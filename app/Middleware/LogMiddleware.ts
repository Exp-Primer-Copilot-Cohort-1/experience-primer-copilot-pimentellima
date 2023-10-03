import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { colorize } from 'App/Core/adapters/controller/helpers/colorize'

class LogMiddleware {
	public async handle({ request, logger }: HttpContextContract, next) {
		logger.info(colorize(0, request.url(), request.method() as any))
		await next()
	}
}

export default LogMiddleware
