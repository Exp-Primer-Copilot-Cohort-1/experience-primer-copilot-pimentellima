import db from '@ioc:Mongoose'
import AdminUser from 'App/Core/domain/entities/user/admin'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import type { IAdminUser } from 'Types/IAdminUser'
import type { IUnity } from 'Types/IUnity'

export class CreateUserAdminUseCase implements UseCase<IAdminUser, IAdminUser> {
	constructor(
		private readonly createUser: UseCase<IAdminUser, IAdminUser>,
		private readonly createUnity: UseCase<IUnity, IUnity>,
	) { } // eslint-disable-line

	public async execute(data: IAdminUser): PromiseEither<AbstractError, IAdminUser> {
		const session = await db.startSession()

		try {
			session.startTransaction()

			const unityOrErr = await this.createUnity.execute(data as IUnity, session)

			if (unityOrErr.isLeft()) throw unityOrErr.extract() // error

			const unity = unityOrErr.extract()

			const adminEntityOrErr = await AdminUser.build({
				...data,
				unity_id: unity._id?.toString(),
				date_expiration: unity.date_expiration?.toString(),
			})

			if (adminEntityOrErr.isLeft()) return adminEntityOrErr

			const admin = adminEntityOrErr.extract().params() as IAdminUser

			const adminOrErr = await this.createUser.execute(admin as IAdminUser, session)

			if (adminOrErr.isLeft()) throw adminOrErr.extract() // error

			await session.commitTransaction()

			return adminOrErr
		} catch (error) {
			await session.abortTransaction()

			return left(error)
		}
	}
}
