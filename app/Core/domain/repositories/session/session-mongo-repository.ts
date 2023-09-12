import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import promiseErrorHandler from 'App/Core/adapters/controller/helpers/promise-err-handler'
import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared/either'
import { SessionUser } from '../../entities/user/session'
import { InvalidCredentialsError } from '../../errors/invalid-credentials'
import { ISession, SessionManagerInterface } from '../interface/session-manager.interface'

const production = process.env.NODE_ENV === 'production'
export class SessionRepository implements SessionManagerInterface {
	constructor(private readonly auth: AuthContract) { } // eslint-disable-line

	public async signIn(
		email: string,
		password: string,
	): PromiseEither<AbstractError, ISession> {
		const [err, userAuth] = await promiseErrorHandler(
			this.auth.use('api').attempt(email, password),
		)

		if (err) {
			return left(new InvalidCredentialsError(err))
		}

		const sessionOrErr = await SessionUser.build(userAuth.user)

		if (sessionOrErr.isLeft()) {
			return left(sessionOrErr.extract())
		}

		const token = {
			type: userAuth.type,
			token: userAuth.token,
		}

		const user = sessionOrErr.extract().params() as unknown as SessionUser

		if (!user.active && production) {
			return left(new InvalidCredentialsError('Usuário não está ativado'))
		}

		return right({
			user,
			token,
		})
	}
}
