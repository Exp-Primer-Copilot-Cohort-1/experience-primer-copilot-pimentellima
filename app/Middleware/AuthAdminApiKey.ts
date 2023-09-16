import ENV from '@ioc:Adonis/Core/Env'

export default class AuthAdminApiKey {
	public async handle({ request, response }, next) {
		const authorization = request.header('Authorization')

		if (ENV.get('NODE_ENV') === 'test') {
			return await next()
		}

		if (authorization !== process.env.ADMIN_API_KEY) {
			return response.status(401).json({
				message: 'Unauthorized due to invalid API key',
			})
		}

		return await next()
	}
}
