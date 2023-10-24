import { SendEmailError } from 'App/Core/domain/errors/send-email.err';
import { AbstractError } from "App/Core/errors/error.interface";
import { Env } from "App/Core/infra/env";
import { IEvn, ILogger } from "App/Core/infra/infra";
import { Logger } from 'App/Core/infra/logger';
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import { encrypt } from 'App/Helpers/encrypt';
import { retry } from 'ts-retry-promise';
import { inject, injectable, registry } from 'tsyringe';
import EDGE, { ISendEmailUseCase } from "../helpers/edge";
import { SendEmailUseCase } from './send-email-use-case';
/**
 * Entrada esperada pelo caso de uso de envio de email de ativação de novo usuário.
 */
type In = {
	id: string
	email: string
	name: string
}

/**
 * Caso de uso que envia um email de ativação para um novo usuário.
 * @implements {UseCase<In, Message>}
 */
@injectable()
@registry([{ token: SendActivationNewUserUseCase, useClass: SendActivationNewUserUseCase }])
export class SendActivationNewUserUseCase implements UseCase<In, Message> {

	/**
	 * Construtor da classe.
	 * @param send Instância do caso de uso de envio de email.
	 * @param env Instância da classe que lida com as variáveis de ambiente.
	 */
	constructor(
		@inject(SendEmailUseCase) private readonly send: ISendEmailUseCase,
		@inject(Env) private readonly env: IEvn,
		@inject(Logger) private readonly logger: ILogger,
	) { }

	/**
	 * Executa o caso de uso de envio de email de ativação de novo usuário.
	 * @param email Email do novo usuário.
	 * @param id ID do novo usuário.
	 * @param name Nome do novo usuário.
	 * @returns Mensagem de sucesso ou erro.
	 */
	async execute({ email, id, name }: In): PromiseEither<AbstractError, Message> {

		const URL = this.env.isProd ? this.env.get('URL') : 'http://localhost:5173'

		const encodeId = await encrypt(JSON.stringify({
			id: id.toString(),
			email: email,
		}))

		const successOrErr = await retry(async () => this.send.execute({
			edge: EDGE.confirm,
			props: {
				site_activation: `${URL}/account-activation/${encodeId}`,
				label: name,
			},
			email: email,
			title: 'Ative sua conta na DPSystem',
		}),
			{
				logger: (msg) => this.logger.emit(msg),
				retries: 5
			})

		if (successOrErr.isLeft()) return left(new SendEmailError(successOrErr.extract()))

		return right({ message: 'Email enviado com sucesso' })
	}
}