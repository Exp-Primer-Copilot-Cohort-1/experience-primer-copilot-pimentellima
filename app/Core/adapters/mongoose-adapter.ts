import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import logger from '../infra/logger'
import { ControllerGeneric } from './controller/helpers'
import { colorize } from './controller/helpers/colorize'
import { HttpRequest } from './controller/ports/http'

const prod = process.env.NODE_ENV === 'production'

/**
 * Adaptador para rota HTTP que recebe um controller genérico e retorna uma função que pode ser usada como rota HTTP.
 * @param controller - O controller genérico que será usado para lidar com a requisição HTTP.
 * @param context - O contexto HTTP da requisição.
 * @param customParams - Parâmetros personalizados que podem ser adicionados à requisição HTTP.
 * @returns Uma resposta HTTP com o corpo e o status code retornados pelo controller genérico.
 */
export const adaptRoute = async (
	controller: ControllerGeneric,
	{ request, params, response, auth }: HttpContextContract,
	customParams?: any,
) => {
	try {
		const httpRequest: HttpRequest = {
			body: {
				...request.body(),
				...request.qs(),
				...customParams,
				...params,
			},
		}

		const { body, statusCode } = await controller.handle(httpRequest, auth?.user)

		if (!prod) {
			const message = colorize(statusCode, request.url(), request.method() as any)
			logger.log(message, statusCode)
		}

		return response.status(statusCode).json(body)
	} catch (error) {
		const message = colorize(501, request.url(), request.method() as any)
		logger.log(message, 501)
	}
}
