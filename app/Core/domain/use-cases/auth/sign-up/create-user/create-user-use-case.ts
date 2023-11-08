import AdminUser from 'App/Core/domain/entities/user/admin'
import { AdminManagerContract } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import type { IAdminUser } from 'App/Types/IAdminUser'

import { UnityNotFoundError } from 'App/Core/domain/errors/unity-not-found'
import { AdminMongooseRepository } from 'App/Core/domain/repositories'
import EmitEventDecorator from 'App/Decorators/EmitEvent'
import { ROLES } from 'App/Roles/types'
import { inject, injectable, registry } from 'tsyringe'
import { CreatePasswordUseCase } from '../create-password/create-password-use-case'
import { ICreatePasswordUseCase } from '../type'

@injectable()
@registry([{ token: CreateUserUseCase, useClass: CreateUserUseCase }])
export class CreateUserUseCase implements UseCase<IAdminUser, IAdminUser> {
	constructor(
		@inject(AdminMongooseRepository) private readonly adminManager: AdminManagerContract,
		@inject(CreatePasswordUseCase) private readonly createPasswordUseCase: ICreatePasswordUseCase,
	) { } // eslint-disable-line

	@EmitEventDecorator('new:user')
	public async execute(data: IAdminUser): PromiseEither<AbstractError, IAdminUser> {

		if (!data.unity_id) return left(new UnityNotFoundError())

		const adminOrErr = await AdminUser.build(data)

		if (adminOrErr.isLeft()) return left(adminOrErr.extract())

		const admin = adminOrErr.extract()

		const passwordOrErr = await this.createPasswordUseCase.execute({
			password: admin.password,
			type: admin.type as ROLES,
			email: admin.email,
		})

		if (passwordOrErr.isLeft()) return left(passwordOrErr.extract())

		admin.definePassword(passwordOrErr.extract().password)

		const userOrErr = await this.adminManager.create(admin)

		return userOrErr
	}
}
