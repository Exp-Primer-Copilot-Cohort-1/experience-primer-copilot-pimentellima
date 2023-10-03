import promiseErrorHandler from 'App/Core/adapters/controller/helpers/promise-err-handler'
import { AbstractError } from 'App/Core/errors/error.interface'
import { ISessionAuth } from 'App/Core/infra/session-auth'
import { PromiseEither, left, right } from 'App/Core/shared/either'
import { SessionUser } from '../../entities/user/session'
import { InvalidCredentialsError } from '../../errors/invalid-credentials'
import { UserNotActiveError } from '../../errors/user-not-on'
import { ISession, SessionManagerInterface } from '../interface/session-manager.interface'

const production = process.env.NODE_ENV === 'production'
export class SessionRepository implements SessionManagerInterface {
	constructor(private readonly auth: ISessionAuth) { } // eslint-disable-line

	public async signIn(
		email: string,
		password: string,
	): PromiseEither<AbstractError, ISession> {
		const [err, userAuth] = await promiseErrorHandler(
			this.auth.signIn(email, password),
		)

		if (err) return left(new InvalidCredentialsError(err))

		const sessionOrErr = await SessionUser.build(userAuth.user)

		if (sessionOrErr.isLeft()) return left(sessionOrErr.extract())

		const token = {
			type: userAuth.type,
			token: userAuth.token,
		}

		const user = sessionOrErr.extract()

		if (!user?.active && production) return left(new UserNotActiveError())

		return right({
			user,
			token,
		})
	}
}
