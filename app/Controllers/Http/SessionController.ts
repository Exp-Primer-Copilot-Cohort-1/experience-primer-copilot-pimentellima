import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import { makeSignInComposer } from 'App/Core/composers'

class SessionController {
	public async store(ctx: HttpContextContract) {
		return adaptRoute(makeSignInComposer(ctx), ctx)
	}

	public async refreshToken({ request, auth }: HttpContextContract) {
		return auth.use('api').generate(request.input('refresh_token'))
	}

	public async getUser({ auth }: HttpContextContract) {
		const user = auth.user
		return user
	}

	public async checkToken({ auth, response }: HttpContextContract) {
		try {
			await auth.check()
		} catch (error) {
			response.send('Missing or invalid jwt token')
			await auth.logout()
			await auth.use('api').revoke()
		}
	}
	async logout({ auth, response }: HttpContextContract) {
		try {
			await auth.use('api').revoke() // 'api' é o guard padrão para autenticação via token
			await auth.logout()
			return response.status(200).json({ message: 'Logout bem-sucedido' })
		} catch (error) {
			return response.status(204)
		}
	}
}

export default SessionController
