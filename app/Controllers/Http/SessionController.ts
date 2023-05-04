import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import { makeSignInComposer } from 'App/Core/composers'
import User from 'App/Models/User'

const SELECTS = require('../user-select')

class SessionController {
	public async store(ctx: HttpContextContract) {
		return adaptRoute(makeSignInComposer(ctx), ctx)
	}

	public async refreshToken({ request, auth }) {
		const refreshTokenInput = request.input('refresh_token')
		return await auth
			.newRefreshToken()
			.generateForRefreshToken(refreshTokenInput, true)
	}

	public async getUser({ auth }) {
		const authUser = await auth.getUser()

		const user = await User.where({
			_id: authUser._id,
		})
			.select(SELECTS)
			.with('unity')
			.with('answer')
			.with('activity')
			.with('userLog')
			.firstOrFail()

		return user
	}

	public async checkToken({ auth, response }) {
		try {
			await auth.check()
		} catch (error) {
			response.send('Missing or invalid jwt token')
		}
	}
}

export default SessionController
