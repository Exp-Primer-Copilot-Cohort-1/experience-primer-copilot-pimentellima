import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, right } from 'App/Core/shared'
import SendPasswordEmail from 'App/Mail/emails/send-password-email'
import { ROLES } from 'App/Roles/types'
import { CreatePasswordProps, Password } from '../type'

const roles = [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SUPERADMIN]

export class CreatePasswordUseCase implements UseCase<CreatePasswordProps, Password> {
	constructor() { }

	@SendPasswordEmail
	public async execute({
		password,
		type,
	}: CreatePasswordProps): PromiseEither<AbstractError, string> {
		if (password && roles.includes(type)) {
			return right(password)
		}

		const pwdChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
		const pwdLen = 6
		const randPassword = Array(pwdLen)
			.fill(pwdChars)
			.map((x) => x[Math.floor(Math.random() * x.length)])
			.join('')

		return right(randPassword)
	}
}
