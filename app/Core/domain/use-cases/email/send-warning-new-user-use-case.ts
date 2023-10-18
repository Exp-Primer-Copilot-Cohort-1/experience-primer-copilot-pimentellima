import { AbstractError } from "App/Core/errors/error.interface";
import { Env, IEvn } from "App/Core/infra/env";
import { ILogger, Logger } from 'App/Core/infra/logger';
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import { retry } from 'ts-retry-promise';
import { inject, injectable, registry } from 'tsyringe';
import { SendEmailError } from '../../errors/send-email.err';
import EDGE, { ISendEmailUseCase } from "../helpers/edge";
import { SendEmailUseCase } from './send-use-case';

type In = {
	email: string
}

/**
 * Envia um email de log avisando que há um novo usuário cadastrado no sistema.
 * @implements {UseCase<In, Message>}
 */
@injectable()
@registry([{ token: SendWarningNewUserUseCase, useClass: SendWarningNewUserUseCase }])
export class SendWarningNewUserUseCase implements UseCase<In, Message> {

	/**
	 * Construtor da classe.
	 * @param send Instância da classe SendEmailUseCase responsável por enviar o email.
	 * @param logger Instância da classe Logger responsável por registrar logs.
	 * @param env Instância da classe Env responsável por obter variáveis de ambiente.
	 */
	constructor(
		@inject(SendEmailUseCase) private readonly send: ISendEmailUseCase,
		@inject(Logger) private readonly logger: ILogger,
		@inject(Env) private readonly env: IEvn,
	) { }

	/**
	 * Executa o caso de uso de envio de email de aviso para um novo usuário.
	 * @param email Email do novo usuário.
	 * @returns Promise contendo o resultado do envio do email.
	 */
	async execute({ email }: In): PromiseEither<AbstractError, Message> {

		// from é o email da empresa DP System
		const from = this.env.get('SMTP_USERNAME') as string
		const successOrErr = await retry(async () => this.send.execute({
			edge: EDGE.new_account,
			props: { user_email: email },
			title: 'Um novo cadastro',
			email: from,
		}), {
			logger: (msg) => this.logger.emit(msg),
			retries: 5
		})

		if (successOrErr.isLeft()) return left(new SendEmailError(successOrErr.extract()))

		return right({ message: 'Email enviado com sucesso' })
	}
}