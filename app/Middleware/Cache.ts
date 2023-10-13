import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { colorize } from 'App/Core/adapters/controller/helpers/colorize'
import Cache from 'App/Core/infra/cache'
import logger from 'App/Core/infra/logger'
import { ROLES } from 'App/Roles/types'
import { Methods } from 'App/Types/IHelpers'
import { IUser } from 'App/Types/IUser'

const getter = [Methods.GET]
const setter = [Methods.POST, Methods.PUT, Methods.PATCH, Methods.DELETE]

const methods = [...getter, ...setter]

const makeKey = (url: string, user: IUser) => {
	const isOnlyProf = user.type === ROLES.PROF || ROLES.CLIENT

	if (isOnlyProf) return `${user._id}:${url}`

	return `${user.unity_id}:${url}`
}

const blacklist = [
	'census',
	'pictures',
	'activities', // TODO: atividades deve ter um cacheamento mais inteligente
	'transactions', // TODO: transações deve ter um cacheamento mais inteligente
]

export default class CacheMiddleware {
	public async handle({ request, response, auth }: HttpContextContract, next) {
		const method = request.method() as Methods
		const URL = request.url()
		const user = auth.user

		const isUrlBlacklisted = blacklist.some((url) => URL.includes(url))
		if (!user) return await next()
		if (!methods.includes(method) || isUrlBlacklisted) return await next()


		const key = makeKey(URL, user)

		const originalResponse = response.response

		if (getter.includes(method)) {
			const cached = await Cache.get(key)
			logger.emit(colorize(0, URL, Methods.CACHE))
			if (cached) return response.send(cached)
		}

		originalResponse.on('finish', async () => {
			const statusCode = response.getStatus()

			if (statusCode >= 400) return

			if (setter.includes(method)) return await Cache.delete(key)

			const body = response.getBody()
			if (getter.includes(method)) return await Cache.set(key, body)

		})

		return await next()
	}
}
