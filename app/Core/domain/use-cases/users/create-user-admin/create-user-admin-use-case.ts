import Event from '@ioc:Adonis/Core/Event'
import AdminUser from 'App/Core/domain/entities/user/admin'
import { AbstractError } from 'App/Core/errors/error.interface'
import { ISessionTransaction } from 'App/Core/infra/session-transaction'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import type { IAdminUser } from 'App/Types/IAdminUser'
import type { IUnity } from 'App/Types/IUnity'
import { NewDrPerformanceUseCase } from '../create-user-dr-performance/create-user-dr-performance-use-case'
export class CreateUserAdminUseCase implements UseCase<IAdminUser, IAdminUser> {
	constructor(
		private readonly createUser: UseCase<IAdminUser, IAdminUser>,
		private readonly createUnity: UseCase<IUnity, IUnity>,
		private readonly createDrPerformance: NewDrPerformanceUseCase,
		private readonly session: ISessionTransaction,
	) { } // eslint-disable-line

	public async execute(data: IAdminUser): PromiseEither<AbstractError, IAdminUser> {
		try {
			this.session.startSession()

			const unityOrErr = await this.createUnity.execute(
				data as IUnity,
				this.session,
			)

			if (unityOrErr.isLeft()) throw unityOrErr.extract() // error

			const unity = unityOrErr.extract()

			const adminEntityOrErr = await AdminUser.build({
				...data,
				unity_id: unity._id?.toString(),
				date_expiration: unity.date_expiration?.toString(),
			})

			if (adminEntityOrErr.isLeft()) throw adminEntityOrErr.extract() // error

			const admin = adminEntityOrErr.extract()

			const userOrErr = await this.createUser.execute(
				admin,
				this.session,
			)

			if (userOrErr.isLeft()) throw userOrErr.extract() // error

			const user = userOrErr.extract()

			await Event.emit('new:unity', { unity, user, session: this.session })

			await this.createDrPerformance.execute({
				admin: user,
				unity,
				franchised: data.franchised,
			})

			await this.session.commitTransaction()

			return userOrErr
		} catch (error) {
			await this.session.abortTransaction()

			return left(error)
		}
	}
}
