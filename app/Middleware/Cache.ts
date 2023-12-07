import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { colorize } from 'App/Core/adapters/controller/helpers/colorize'
import Cache from 'App/Core/infra/cache'
import logger from 'App/Core/infra/logger'
import { ROLES } from 'App/Roles/types'
import { Methods } from 'App/Types/IHelpers'
import { IUser } from 'App/Types/IUser'

const getter = [Methods.GET]
const setter = [Methods.POST, Methods.PUT, Methods.PATCH, Methods.DELETE]

const METHODS = [...getter, ...setter]

const makeSuperKey = (name_route: string, user: IUser) => {
	const isOnlyProf = user.type === ROLES.PROF || ROLES.CLIENT

	if (isOnlyProf) return `${name_route}:${user._id}`

	return `${name_route}:${user.unity_id}`
}

const makeKey = (...params: Record<string, any>[]) => {
	return params?.map((param) => {
		const keys = Object.keys(param)
		return keys?.map((key) => `${key}:${param[key]}`).join(':')
	}).join(':')
}

const blacklist = [
	'census', // TODO: censo é real time, não deve ser cacheado
	'pictures', // TODO: não é necessário cacheamento
	'activities', // TODO: atividades deve ter um cacheamento mais inteligente
	'transactions', // TODO: transações deve ter um cacheamento mais inteligente
	'profs', // TODO: profs é real time, não deve ser cacheado
	'clients', // TODO: clients é real time, não deve ser cacheado
	'users', // TODO: users é real time, não deve ser cacheado
	'secs', // TODO: secs é real time, não deve ser cacheado
	'attendance', // TODO: attendance é real time, não deve ser cacheado
	'business-franchises' // TODO: dados muito simples, não deve ser cacheado
]

export default class CacheMiddleware {
	public async handle({ request, response, auth, routeKey, route }: HttpContextContract, next) {

		const method = request.method() as Methods
		const name = route?.name?.split('.')[0] || routeKey

		const user = auth.user

		const isUrlBlacklisted = blacklist.some((url) => name.includes(url))

		if (!user) return await next()
		if (!METHODS.includes(method) || isUrlBlacklisted) return await next()

		const superKey = makeSuperKey(name, user)
		const key = makeKey({ superKey }, request.qs(), request.params())

		const originalResponse = response.response

		if (getter.includes(method)) {
			const cached = await Cache.get(key)
			logger.emit(colorize(0, name, Methods.CACHE))
			if (cached) return response.send(cached)
		}

		const pattern = `superKey:${superKey}*`;

		originalResponse.on('close', async () => {
			const statusCode = response.getStatus()
			if (statusCode >= 400) return

			if (setter.includes(method)) {
				return await Cache.flushKey(pattern)
			}


			const body = response.getBody()

			if (getter.includes(method)) {
				return await Cache.set(key, body)
			}

		})

		return await next()
	}
}
