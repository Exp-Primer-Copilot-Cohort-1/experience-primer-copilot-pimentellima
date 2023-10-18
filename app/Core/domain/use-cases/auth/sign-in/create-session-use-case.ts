import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import promiseErrorHandler from 'App/Core/adapters/controller/helpers/promise-err-handler'
import { SessionUser } from 'App/Core/domain/entities/user/session'
import { UserNotActiveError } from 'App/Core/domain/errors'
import { InvalidCredentialsError } from 'App/Core/domain/errors/invalid-credentials'
import { ISession } from 'App/Core/domain/repositories/interface/session-manager.interface'
import { Credentials } from 'App/Core/domain/use-cases/helpers/credentials'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared/either'
import { injectable, registry } from 'tsyringe'

const production = process.env.NODE_ENV === 'production'

@injectable()
@registry([{ token: CreateSessionUseCase, useClass: CreateSessionUseCase }])
export class CreateSessionUseCase implements UseCase<Credentials, ISession> {
	private auth: AuthContract

	constructor(auth: any) {
		this.auth = auth
	}// eslint-disable-line

	public async execute({
		email,
		password
	}: Credentials): PromiseEither<AbstractError, ISession> {
		const [err, session] = await promiseErrorHandler(
			this.auth.use('api').attempt(email, password),
		)

		if (err) return left(new InvalidCredentialsError(err))

		if (!session.user.active) {
			this.auth.use('api').logout()
			return left(new UserNotActiveError())
		}

		const sessionOrErr = await SessionUser.build(session.user)

		if (sessionOrErr.isLeft()) return left(sessionOrErr.extract())

		const token = {
			type: session.type,
			token: session.token,
		}

		const user = sessionOrErr.extract()

		if (!user?.active && production) return left(new UserNotActiveError())

		return right({
			user,
			token,
		})
	}
}
