import { SendEmailError } from 'App/Core/domain/errors/send-email.err'
import { AbstractError } from 'App/Core/errors/error.interface'
import { Cache } from 'App/Core/infra/cache'
import { Env } from 'App/Core/infra/env'
import { CacheContract, IEvn, ILogger } from 'App/Core/infra/infra'
import { Logger } from 'App/Core/infra/logger'
import { PromiseEither, left, right } from 'App/Core/shared'
import User from 'App/Models/User'
import { retry } from 'ts-retry-promise'
import { inject, injectable, registry } from 'tsyringe'
import { UserNotFoundError } from '../../errors'
import EDGE, { ISendEmailUseCase, MailParams } from '../helpers/edge'
import { SendEmailUseCase } from './send-email-use-case'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { encrypt } from 'App/Helpers/encrypt'
import { randomBytes } from 'crypto'

type In = {
	id: string
}

export type ISendPasswordRecoveryEmailUseCase = UseCase<In, Message>

/**
 * Use case responsável por enviar email de recuperação de senha
 * @implements {ISendPasswordRecoveryEmailUseCase}
 */
@injectable()
@registry([
	{
		token: SendPasswordRecoveryEmailUseCase,
		useClass: SendPasswordRecoveryEmailUseCase,
	},
])
export class SendPasswordRecoveryEmailUseCase implements ISendEmailUseCase {
	/**
	 * Construtor da classe.
	 * @param {CacheContract} cache
	 * @param {ILogger} logger - Instância do logger, responsável por logar mensagens.
	 * @param send Instância do caso de uso de envio de email.
	 * @param {IEvn} env - Instância do env, responsável por pegar as variáveis de ambiente.
	 */
	constructor(
		@inject(SendEmailUseCase) private readonly send: ISendEmailUseCase,
		@inject(Cache) private readonly cache: CacheContract,
		@inject(Logger) private readonly logger: ILogger,
		@inject(Env) private readonly env: IEvn,
	) {}

	/**
	 * Método responsável por enviar o email.
	 * @param {MailParams} params - Parâmetros do email.
	 * @returns {PromiseEither<AbstractError, Message>} - Retorna uma promessa com o resultado do envio do email.
	 */

	async execute({ email }: MailParams): PromiseEither<AbstractError, Message> {
		const user = await User.findOne({ email })
		if (!user) return left(new UserNotFoundError())

		const URL = this.env.isProd ? this.env.get('URL') : 'http://localhost:5173'

		const bytes = randomBytes(8)
		const randomString = bytes.toString('hex')

		const password_recovery_url = `${URL}/redefine-password/${user._id}/${randomString}`

		this.cache.set(
			`${user._id}-redefine-password-url`,
			password_recovery_url,
			60 * 60,
		)

		const successOrErr = await retry(
			async () =>
				this.send.execute({
					edge: EDGE.password_recovery_url,
					props: {
						password_recovery_url,
					},
					email: email,
					title: 'Recuperação de senha',
				}),
			{
				logger: (msg) => this.logger.emit(msg),
				retries: 5,
			},
		)

		if (successOrErr.isLeft()) return left(new SendEmailError(successOrErr.extract()))

		return right({ message: 'Email enviado com sucesso' })
	}
}
