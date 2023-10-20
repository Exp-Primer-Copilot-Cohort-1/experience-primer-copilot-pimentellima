
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import logger from 'App/Core/infra/logger'

const isProd = process.env.NODE_ENV === 'production'

export default class LogMiddleware {
	public async handle({ request, response }: HttpContextContract, next) {

		const originalResponse = response.response

		originalResponse.on('finish', async () => {
			if (isProd) return
			const body = response.getBody()
			const statusCode = response.getStatus()
			logger.log(request.url(), request.method(), statusCode, body?.message)
		})

		originalResponse.on('error', async () => {
			const body = response.getBody()
			const statusCode = response.getStatus()
			logger.log(request.url(), request.method(), statusCode, body?.message)
		})

		return await next()
	}
}
