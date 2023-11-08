import AdminUser from 'App/Core/domain/entities/user/admin'
import { AdminManagerContract } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import type { IAdminUser } from 'App/Types/IAdminUser'

import { UnityNotFoundError } from 'App/Core/domain/errors/unity-not-found'
import { AdminMongooseRepository } from 'App/Core/domain/repositories'
import EmitEventDecorator from 'App/Decorators/EmitEvent'
import { inject, injectable, registry } from 'tsyringe'

@injectable()
@registry([{ token: CreateUserSimplifiedUseCase, useClass: CreateUserSimplifiedUseCase }])
export class CreateUserSimplifiedUseCase implements UseCase<IAdminUser, IAdminUser> {
	constructor(
		@inject(AdminMongooseRepository) private readonly adminManager: AdminManagerContract,
	) { } // eslint-disable-line

	@EmitEventDecorator('new:user')
	public async execute(data: IAdminUser): PromiseEither<AbstractError, IAdminUser> {
		if (!data.unity_id) return left(new UnityNotFoundError())

		const adminOrErr = await AdminUser.build(data)

		if (adminOrErr.isLeft()) return left(adminOrErr.extract())

		const admin = adminOrErr.extract()
		const userOrErr = await this.adminManager.create(admin)

		return userOrErr
	}
}
