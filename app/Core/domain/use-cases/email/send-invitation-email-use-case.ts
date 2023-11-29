import { AbstractError } from 'App/Core/errors/error.interface'
import { ILogger } from 'App/Core/infra/infra'
import { Logger } from 'App/Core/infra/logger'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { encrypt } from 'App/Helpers/encrypt'
import { retry } from 'ts-retry-promise'
import { inject, injectable, registry } from 'tsyringe'
import { SendEmailError } from '../../errors/send-email.err'
import EDGE, { ISendEmailUseCase as ISendInvitationUseCase } from '../helpers/edge'
import { SendEmailUseCase } from './send-email-use-case'

async function dataToUriComponent(data: any) {
	const hash = await encrypt(JSON.stringify(data))
	return encodeURIComponent(hash).replace('.', '-')
}

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
		token: SendInvitationEmailUseCase,
		useClass: SendInvitationEmailUseCase,
	},
])
export class SendInvitationEmailUseCase implements ISendInvitationUseCase {
	/**
	 * Construtor da classe.
	 * @param {ILogger} logger - Instância do logger, responsável por logar mensagens.
	 * @param send Instância do caso de uso de envio de email.
	 */
	constructor(
		@inject(SendEmailUseCase) private readonly send: ISendInvitationUseCase,
		@inject(Logger) private readonly logger: ILogger,
	) {}

	/**
	 * Método responsável por enviar o email.
	 * @param {{ email: string }} params - Parâmetros do email.
	 * @returns {PromiseEither<AbstractError, Message>} - Retorna uma promessa com o resultado do envio do email.
	 */

	async execute({ email }: { email: string }): PromiseEither<AbstractError, Message> {
		try {
			const safeHashUri = await dataToUriComponent({
				email,
			})

			const indicationLink = `http://localhost:5173/signup?email=${email}&code=${safeHashUri}`
			const successOrErr = await retry(
				async () =>
					this.send.execute({
						edge: EDGE.invitation,
						props: {
							invitation: indicationLink,
						},
						email: email,
						title: 'Você recebeu uma indicação para acessar o DPSystem',
					}),
				{
					logger: (msg) => this.logger.emit(msg),
					retries: 5,
				},
			)
			if (successOrErr.isLeft())
				return left(new SendEmailError(successOrErr.extract()))

			return right({ message: 'Email enviado com sucesso' })
		} catch (e) {
			console.log(e)
			return left(new AbstractError('Internal error', 500))
		}
	}
}
