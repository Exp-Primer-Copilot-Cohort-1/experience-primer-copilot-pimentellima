import { SendEmailError } from 'App/Core/domain/errors/send-email.err';
import { AbstractError } from "App/Core/errors/error.interface";
import logger from 'App/Core/infra/logger';
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import { retry } from 'ts-retry-promise';
import { inject, injectable, registry } from 'tsyringe';
import EDGE, { ISendEmailUseCase } from "../helpers/edge";
import { SendEmailUseCase } from './send-email-use-case';

/**
 * Entrada esperada pelo caso de uso de envio de email de aviso que as
 * respostas atuais são maiores ou iguais que as anteriores.
 */
type In = {
	email: string
	name: string
	client: string
	unity: string
}

export type ISendWaringCurrentReplyInGreaterPreviousUseCase = UseCase<In, Message>

/**
 * Caso de uso que envia um email de aviso
 * @implements {UseCase<In, Message>}
 */
@injectable()
@registry([{
	token: SendWarningCurrentReplyInGreaterPreviousUseCase,
	useClass: SendWarningCurrentReplyInGreaterPreviousUseCase
}])
export class SendWarningCurrentReplyInGreaterPreviousUseCase
	implements ISendWaringCurrentReplyInGreaterPreviousUseCase {

	/**
	 * Construtor da classe.
	 * @param send Instância do caso de uso de envio de email.
	 */
	constructor(
		@inject(SendEmailUseCase) private readonly send: ISendEmailUseCase,
	) { }

	/**
	 * Executa o caso de uso de envio de email de ativação de novo usuário.
	 * @param email Email do usuário destinatário.
	 * @param name Nome do Profissional.
	 * @param client Nome do cliente.
	 * @param unity Nome da unidade.
	 * @returns Mensagem de sucesso ou erro.
	 */
	async execute({ email, name, client, unity }: In): PromiseEither<AbstractError, Message> {

		const successOrErr = await retry(async () => this.send.execute({
			edge: EDGE.reply_current_greater_previous,
			props: {
				label: name,
				client,
				unity
			},
			email: email,
			title: 'Aviso! Paciente não apresentou melhora no tratamento',
		}), {
			logger: (msg) => logger.emit(msg),
			retries: 5
		})

		if (successOrErr.isLeft()) return left(new SendEmailError(successOrErr.extract()))

		return right({ message: 'Email enviado com sucesso' })
	}
}