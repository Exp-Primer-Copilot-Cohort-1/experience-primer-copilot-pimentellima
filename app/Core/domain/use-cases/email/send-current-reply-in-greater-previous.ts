import { RFormSFMongooseManager } from "App/Core/domain/repositories";
import { RFormSFManagerInterface } from "App/Core/domain/repositories/interface";
import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import { inject, injectable, registry } from 'tsyringe';
import {
	ISendWaringCurrentReplyInGreaterPreviousUseCase,
	SendWarningCurrentReplyInGreaterPreviousUseCase
} from "./send-warning-current-reply-in-greater-previous";

/**
 * Entrada esperada pelo caso de uso de envio de email de aviso que as
 * respostas atuais são maiores ou iguais que as anteriores.
 */
type In = {
	group_id: string
}

/**
 * Caso de uso que envia um email de aviso para o profissional e para o coordenador da unidade.
 * @implements {UseCase<In, Message>}
 */
@injectable()
@registry([{ token: SendCurrentReplyInGreaterPreviousUseCase, useClass: SendCurrentReplyInGreaterPreviousUseCase }])
export class SendCurrentReplyInGreaterPreviousUseCase implements UseCase<In, Message> {

	/**
	 * Construtor da classe.
	 * @param send Instância do caso de uso de envio de email.
	 */
	constructor(
		@inject(SendWarningCurrentReplyInGreaterPreviousUseCase)
		private readonly send: ISendWaringCurrentReplyInGreaterPreviousUseCase,
		@inject(RFormSFMongooseManager) private readonly manager: RFormSFManagerInterface
	) { }

	/**
	 * Executa o caso de uso de envio de email avisando que as respostas atuais são maiores ou iguais que as anteriores.
	 * @param group_id ID do grupo de atividades.
	 * @returns Mensagem de sucesso ou erro.
	 */
	async execute({ group_id }: In): PromiseEither<AbstractError, Message> {

		const infoOrErr = await this.manager.findInfoThisReply(group_id)

		if (infoOrErr.isLeft()) return left(infoOrErr.extract())

		const info = infoOrErr.extract()

		const promiseSendCoordinator = this.send.execute({
			email: info.coordinator.email || info.unity.email, // email do coordenador
			name: info.coordinator.name,
			client: info.client.name,
			unity: info.unity.name
		})

		const promiseSendProf = this.send.execute({
			email: info.prof.email, // email do profissional
			name: info.prof.name,
			client: info.client.name,
			unity: info.unity.name
		})

		await Promise.all([
			promiseSendCoordinator,
			promiseSendProf
		])

		return right({ message: 'Email enviado com sucesso' })
	}
}