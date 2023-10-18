
import { AbstractError } from "App/Core/errors/error.interface";
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
	password: string
}

/**
 * Caso de uso para enviar uma nova senha para usuários criados pelo admin/admin_prof.
 * @implements {UseCase<In, Message>}
 */
@injectable()
@registry([{ token: SendNewPasswordUseCase, useClass: SendNewPasswordUseCase }])
export class SendNewPasswordUseCase implements UseCase<In, Message> {

	/**
	 * Construtor da classe.
	 * @param send Instância da classe SendEmailUseCase para enviar o email.
	 * @param logger Instância da classe Logger para logar mensagens.
	 */
	constructor(
		@inject(SendEmailUseCase) private readonly send: ISendEmailUseCase,
		@inject(Logger) private readonly logger: ILogger,
	) { }

	/**
	 * Executa o caso de uso.
	 * @param email Email do destinatário.
	 * @param password Nova senha.
	 * @returns Uma mensagem de sucesso ou um erro.
	 */
	async execute({ email, password }: In): PromiseEither<AbstractError, Message> {

		const successOrErr = await retry(async () => this.send.execute({
			edge: EDGE.create_password,
			props: { password },
			title: 'Uma nova senha',
			email: email,
		}), {
			logger: (msg) => this.logger.emit(msg),
			retries: 5
		})

		if (successOrErr.isLeft()) return left(new SendEmailError(successOrErr.extract()))

		return right({ message: 'Email enviado com sucesso' })
	}
}