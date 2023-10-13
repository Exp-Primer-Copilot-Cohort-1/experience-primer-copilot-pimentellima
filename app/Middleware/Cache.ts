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
		if (!methods.includes(method) || isUrlBlacklisted) return await next()


		if (user && method == Methods.GET) {
			const key = makeKey(URL, user)
			const cached = await Cache.get(key)

			logger.emit(colorize(0, URL, Methods.CACHE))

			if (cached) return response.send(JSON.parse(cached))

			const originalResponse = response.response

			originalResponse.on('finish', async () => {
				const body = response.getBody()
				await Cache.set(key, JSON.stringify(body))
			})

		}


		if (user && setter.includes(method)) {
			const key = makeKey(URL, user)
			await Cache.delete(key)
		}


		return await next()
	}
}
