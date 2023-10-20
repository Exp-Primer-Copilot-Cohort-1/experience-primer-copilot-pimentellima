import { AbstractError } from 'App/Core/errors/error.interface'
import { EventEmitter, IEventEmitter } from 'App/Core/infra/event-emitter'
import { PromiseEither, right } from 'App/Core/shared'
import { ROLES } from 'App/Roles/types'
import { inject, injectable, registry } from 'tsyringe'
import { CreatePasswordProps, ICreatePasswordUseCase, Password } from '../type'

const roles = [ROLES.ADMIN, ROLES.ADMIN_PROF, ROLES.SUPERADMIN]

@injectable()
@registry([{ token: CreatePasswordUseCase, useClass: CreatePasswordUseCase }])
export class CreatePasswordUseCase implements ICreatePasswordUseCase {

	constructor(
		@inject(EventEmitter) private readonly event: IEventEmitter
	) { }

	public async execute({
		password,
		type,
		email,
	}: CreatePasswordProps): PromiseEither<AbstractError, Password> {
		if (password && type && roles.includes(type)) {
			return right({ password })
		}

		const pwdChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
		const pwdLen = 6
		const randPassword = Array(pwdLen)
			.fill(pwdChars)
			.map((x) => x[Math.floor(Math.random() * x.length)])
			.join('')

		await this.event.emit('new:password', { password: randPassword, email })

		return right({ password: randPassword })
	}
}
