import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import promiseErrorHandler from 'App/Core/adapters/controller/helpers/promise-err-handler'
import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared/either'
import { SessionUser } from '../../entities/user/session'
import { InvalidCredentialsError } from '../../errors/invalid-credentials'
import { ISession, SessionManagerInterface } from '../interface/session-manager.interface'

export class SessionRepository implements SessionManagerInterface {
	constructor(private readonly auth: AuthContract) { }

	public async signIn(
		email: string,
		password: string,
	): PromiseEither<AbstractError, ISession> {
		const [err, userAuth] = await promiseErrorHandler(
			this.auth.use('api').attempt(email, password),
		)

		if (err) {
			return left(new InvalidCredentialsError())
		}

		const sessionOrErr = await SessionUser.build(userAuth.user)

		if (sessionOrErr.isLeft()) {
			return left(sessionOrErr.extract())
		}

		const token = {
			type: userAuth.type,
			token: userAuth.token,
		}

		return right({
			user: sessionOrErr.extract().params() as unknown as SessionUser,
			token,
		})
	}
}
