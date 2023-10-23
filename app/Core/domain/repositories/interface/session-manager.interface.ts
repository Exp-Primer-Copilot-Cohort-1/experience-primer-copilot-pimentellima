import { SystemUser } from 'App/Core/domain/entities/abstract/system-user.abstract'
import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'

export type ISession = {
	token: {
		token: string
		type: 'bearer'
	}
	user: SystemUser
}

export interface SessionManagerContract {
	signIn: (email: string, password: string) => PromiseEither<AbstractError, ISession>
}
