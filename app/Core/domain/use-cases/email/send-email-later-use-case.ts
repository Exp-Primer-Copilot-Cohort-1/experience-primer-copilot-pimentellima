import { SendEmailError } from "App/Core/domain/errors/send-email.err";
import { Env } from 'App/Core/infra/env';
import { IEvn, ILogger, IMail } from "App/Core/infra/infra";
import { Logger } from 'App/Core/infra/logger';
import { Mail } from "App/Core/infra/mail";
import { PromiseEither, left, right } from "App/Core/shared";
import { inject, injectable, registry } from 'tsyringe';
import { ISendEmailUseCase, MailParams } from "../helpers/edge";
/**
 * Classe responsável por enviar emails com baixa prioridade.
 * @implements {ISendEmailUseCase}
 */
@injectable()
@registry([{ token: SendEmailLaterUseCase, useClass: SendEmailLaterUseCase }])
export class SendEmailLaterUseCase implements ISendEmailUseCase {
	/**
	 * Construtor da classe.
	 * @param {ILogger} logger - Instância do logger, responsável por logar mensagens.
	 * @param {IEvn} env - Instância do env, responsável por pegar as variáveis de ambiente.
	 * @param {IMail} mail - Instância do mail, responsável por enviar o email.
	 */
	constructor(
		@inject(Logger) private readonly logger: ILogger,
		@inject(Env) private readonly env: IEvn,
		@inject(Mail) private readonly mail: IMail
	) { }

	/**
	 * Método responsável por enviar o email.
	 * @param {MailParams} params - Parâmetros do email.
	 * @returns {PromiseEither<AbstractError, Message>} - Retorna uma promessa com o resultado do envio do email.
	 */
	async execute({ edge, props, email, title }: MailParams): PromiseEither<SendEmailError, Message> {
		try {
			const from = this.env.get('SMTP_USERNAME') as string
			await this.mail.sendLater({
				from,
				email,
				title,
				edge,
				props
			})
			this.logger.emit(`Email enviado para ${email}`)
			return right({ message: 'Email enviado com sucesso' })

		} catch (error) {
			this.logger.fatal(error)
			return left(new SendEmailError(error))
		}
	}
}