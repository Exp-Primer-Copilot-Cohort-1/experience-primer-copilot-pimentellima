import AdminUser from 'App/Core/domain/entities/user/admin'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import type { IAdminUser } from 'Types/IAdminUser'

import SendSignUpConfirmEmail from 'App/Mail/emails/send-sign-up-confirm-email'
import { IUnity } from 'Types/IUnity'

export class CreateUserAdminUseCase implements UseCase<IAdminUser, IAdminUser> {
	constructor(
		private readonly createUser: UseCase<IAdminUser, IAdminUser>,
		private readonly createUnity: UseCase<IUnity, IUnity>,
	) { }

	@SendSignUpConfirmEmail
	public async execute(data: IAdminUser): PromiseEither<AbstractError, IAdminUser> {
		const adminOrErr = await AdminUser.build(data)

		if (adminOrErr.isLeft()) {
			return left(adminOrErr.extract())
		}

		return right({} as IAdminUser)
	}
}
