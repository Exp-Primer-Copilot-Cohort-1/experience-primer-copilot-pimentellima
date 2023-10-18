import { AbstractError } from "App/Core/errors/error.interface";
import { LOGO } from 'App/Core/infra/constants';
import { Env, IEvn } from 'App/Core/infra/env';
import { ILogger, Logger } from 'App/Core/infra/logger';
import { IMail, Mail } from "App/Core/infra/mail";
import { PromiseEither, left, right } from "App/Core/shared";
import { inject, injectable, registry } from 'tsyringe';
import { SendEmailError } from "../../errors/send-email.err";
import { ISendEmailUseCase, MailParams } from "../helpers/edge";
/**
 * Classe responsável por enviar emails.
 * @implements {ISendEmailUseCase}
 */
@injectable()
@registry([{ token: SendEmailUseCase, useClass: SendEmailUseCase }])
export class SendEmailUseCase implements ISendEmailUseCase {
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
	async execute({ edge, props, email, title }: MailParams): PromiseEither<AbstractError, Message> {
		try {
			const from = this.env.get('SMTP_USERNAME') as string
			await this.mail.send((message) => {
				message.embed(LOGO, 'logo')
				message
					.from(from, 'DP System')
					.to(email)
					.subject(title)
					.htmlView(edge, props)
			})
			this.logger.emit(`Email enviado para ${email}`)
			return right({ message: 'Email enviado com sucesso' })

		} catch (error) {
			this.logger.emit(error)
			return left(new SendEmailError(error))
		}
	}
}