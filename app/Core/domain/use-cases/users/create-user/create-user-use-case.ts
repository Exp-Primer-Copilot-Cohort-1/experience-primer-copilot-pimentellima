import AdminUser from 'App/Core/domain/entities/user/admin'
import { AdminManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import type { IAdminUser } from 'App/Types/IAdminUser'

import { UnitNotFoundError } from 'App/Core/domain/errors/unit-not-found'
import SendSignUpConfirmEmail from 'App/Mail/emails/send-sign-up-confirm-email'
import { ROLES } from 'App/Roles/types'
import { CreatePasswordProps, Password } from '../type'

type CreatePasswordUseCase = UseCase<CreatePasswordProps, Password>

export class CreateUserUseCase implements UseCase<IAdminUser, IAdminUser> {
	constructor(
		private readonly adminManager: AdminManagerInterface,
		private readonly createPasswordUseCase: CreatePasswordUseCase,
	) { } // eslint-disable-line

	@SendSignUpConfirmEmail
	public async execute(
		data: IAdminUser,
		session = undefined,
	): PromiseEither<AbstractError, IAdminUser> {
		if (!data.unity_id) return left(new UnitNotFoundError())

		const adminOrErr = await AdminUser.build(data)

		if (adminOrErr.isLeft()) return adminOrErr

		const admin = adminOrErr.extract()

		const passwordOrErr = await this.createPasswordUseCase.execute({
			password: admin.password,
			type: admin.type as ROLES,
			email: admin.email,
		})

		if (passwordOrErr.isLeft()) return left(passwordOrErr.extract())

		admin.definePassword(passwordOrErr.extract())

		const userOrErr = await this.adminManager.create(admin.params(), session)

		return userOrErr
	}
}
