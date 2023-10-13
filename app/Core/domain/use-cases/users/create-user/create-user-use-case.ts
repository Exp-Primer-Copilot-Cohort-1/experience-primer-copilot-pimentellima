import AdminUser from 'App/Core/domain/entities/user/admin'
import { AdminManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import type { IAdminUser } from 'App/Types/IAdminUser'

import { UnityNotFoundError } from 'App/Core/domain/errors/unit-not-found'
import EmitEventDecorator from 'App/Decorators/EmitEvent'
import { ROLES } from 'App/Roles/types'
import { CreatePasswordProps, Password } from '../type'

type CreatePasswordUseCase = UseCase<CreatePasswordProps, Password>

export class CreateUserUseCase implements UseCase<IAdminUser, IAdminUser> {
	constructor(
		private readonly adminManager: AdminManagerInterface,
		private readonly createPasswordUseCase: CreatePasswordUseCase,
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
