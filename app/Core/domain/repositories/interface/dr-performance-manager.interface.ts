import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { IAdminUser } from 'App/Types/IAdminUser'
import { IUnity } from 'App/Types/IUnity'

export interface DrPerformanceManager {
	addUnity: (unity_id: IUnity, ...args: any) => PromiseEither<AbstractError, IUnity>
	addAdmin: (
		admin_id: IAdminUser,
		...args: any
	) => PromiseEither<AbstractError, IAdminUser>
}
