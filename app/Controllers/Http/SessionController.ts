import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

const SELECTS = require('../../SelectsQuery/user-select')

import Unity from 'App/Models/Unity'
import User from 'App/Models/User'

class SessionController {
  public async store({ request, auth, response }: HttpContextContract) {
    const { email, password } = request.all()

    const userAuth = await auth.use('api').attempt(email, password)

    const { user } = userAuth

    if (!user) {
      return response.status(404).send({
        message: 'Usuário Não Cadastrado',
      })
    }

    const unity = await Unity.findById(user.unity_id)

    if (!unity) {
      return response.status(401).send({
        message: 'Unidade Não Cadastrada',
      })
    }

    const dateNow = new Date()

    if (user.active === false) {
      return response.status(403).send({
        message: 'Usuário não está ativo',
      })
    }

    if (unity.date_expiration && new Date(unity.date_expiration) < dateNow) {
      return response.status(402).send({
        message: 'Sua Unidade está expirada, entre em contato com os responsáveis',
      })
    }

    return { token: userAuth, user }
  }

  public async refreshToken({ request, auth }) {
    const refreshTokenInput = request.input('refresh_token')
    return await auth.newRefreshToken().generateForRefreshToken(refreshTokenInput, true)
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

module.exports = SessionController
