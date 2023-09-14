import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { IUserClient } from 'App/Types/IClient'

export interface ClientManagerInterface {
	findAll: (unity_id: string) => PromiseEither<AbstractError, IUserClient[]>
	findById: (id: string) => PromiseEither<AbstractError, IUserClient>
	create: (
		client: Partial<IUserClient>,
		unity_id: string,
	) => PromiseEither<AbstractError, IUserClient>
	updateById: (
		client: Partial<IUserClient>,
		id: string,
	) => PromiseEither<AbstractError, IUserClient>
}
