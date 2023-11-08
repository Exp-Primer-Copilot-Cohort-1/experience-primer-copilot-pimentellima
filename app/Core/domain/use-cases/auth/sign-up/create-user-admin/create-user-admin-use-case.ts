import AdminUser from 'App/Core/domain/entities/user/admin'
import { CreateUnityUseCase } from 'App/Core/domain/use-cases'
import { AbstractError } from 'App/Core/errors/error.interface'
import { EventEmitter } from 'App/Core/infra/event-emitter'
import { IEventEmitter, ISessionTransaction } from 'App/Core/infra/infra'
import { SessionTransaction } from 'App/Core/infra/session-transaction'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import type { IAdminUser } from 'App/Types/IAdminUser'
import type { IUnity } from 'App/Types/IUnity'
import { delay, inject, injectable, registry } from 'tsyringe'
import {
	CreateFranchiseDrPerformanceUseCase,
	INewDrPerformanceUseCase
} from '../create-user-dr-performance/create-user-dr-performance-use-case'
import { CreateUserUseCase } from '../create-user/create-user-use-case'

@injectable()
@registry([{ token: CreateUserAdminUseCase, useClass: CreateUserAdminUseCase }])
export class CreateUserAdminUseCase implements UseCase<IAdminUser, IAdminUser> {
	constructor(
		@inject(CreateUserUseCase) private readonly createUser: UseCase<IAdminUser, IAdminUser>,
		@inject(delay(() => CreateUnityUseCase)) private readonly createUnity: UseCase<IUnity, IUnity>,
		@inject(CreateFranchiseDrPerformanceUseCase) private readonly createDrPerformance: INewDrPerformanceUseCase,
		@inject(SessionTransaction) private readonly session: ISessionTransaction,
		@inject(EventEmitter) private readonly event: IEventEmitter,
	) { } // eslint-disable-line

	public async execute(data: IAdminUser): PromiseEither<AbstractError, IAdminUser> {
		try {
			await this.session.startSession()

			const unityOrErr = await this.createUnity.execute(
				data as IUnity,
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

			await this.event.emit('new:unity', { unity, user, session: this.session })

			if (data.franchised) {
				await this.createDrPerformance.execute({
					admin: user,
					unity,
					franchised: data.franchised,
				})
			}

			await this.session.commitTransaction()

			return userOrErr
		} catch (error) {
			await this.session.abortTransaction()

			return left(error)
		}
	}
}
