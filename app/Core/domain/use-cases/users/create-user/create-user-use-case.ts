import AdminUser from 'App/Core/domain/entities/user/admin'
import { UserAdminIsExistError } from 'App/Core/domain/errors/user-admin-is-exist'
import {
	AdminManagerInterface,
	UnitiesManagerInterface,
} from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import type { IAdminUser } from 'Types/IAdminUser'

import SendSignUpConfirmEmail from 'App/Mail/emails/send-sign-up-confirm-email'
import { ROLES } from 'App/Roles/types'
import { CreatePasswordProps, Password } from '../type'

type CreatePasswordUseCase = UseCase<CreatePasswordProps, Password>

export class CreateUserUseCase implements UseCase<IAdminUser, IAdminUser> {
	constructor(
		private readonly unityManager: UnitiesManagerInterface,
		private readonly adminManager: AdminManagerInterface,
		private readonly createPasswordUseCase: CreatePasswordUseCase,
	) { }

	@SendSignUpConfirmEmail
	public async execute(data: IAdminUser): PromiseEither<AbstractError, IAdminUser> {
		const adminOrErr = await AdminUser.build(data)

		if (adminOrErr.isLeft()) {
			return left(adminOrErr.extract())
		}

		const admin = adminOrErr.extract()

		const userOrErr = await this.adminManager.findByEmail(admin.email)

		if (userOrErr.isRight()) {
			return left(new UserAdminIsExistError())
		}

		const unityOrErr = await this.unityManager.findById(admin.unity_id)

		if (unityOrErr.isLeft()) {
			return left(unityOrErr.extract())
		}

		const passwordOrErr = await this.createPasswordUseCase.execute({
			password: admin.password,
			type: admin.type as ROLES,
			email: admin.email,
		})

		if (passwordOrErr.isLeft()) {
			return left(passwordOrErr.extract())
		}

		admin.definePassword(passwordOrErr.extract())

		const createUserOrErr = await this.adminManager.create(admin)

		if (createUserOrErr.isLeft()) {
			return left(createUserOrErr.extract())
		}

		admin.defineId(createUserOrErr.extract()._id)

		return right(admin.params())
	}
}
