import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { IAdminUser } from 'App/Types/IAdminUser'

export interface AdminManagerContract {
	findById: (id: string) => PromiseEither<AbstractError, IAdminUser>
	findByEmail: (email: string) => PromiseEither<AbstractError, IAdminUser>
	findAll: () => PromiseEither<AbstractError, IAdminUser[]>
	create: (data: IAdminUser, ...args: any) => PromiseEither<AbstractError, IAdminUser>
	activation: (id: string) => PromiseEither<AbstractError, IAdminUser>
}
