import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, right } from "App/Core/shared";
import { inject, injectable, registry } from 'tsyringe';
import { SendActivationNewUserUseCase } from './send-activation-new-user-use-case';
import { SendWarningNewUserUseCase } from './send-warning-new-user-use-case';

type In = {
	id: string,
	email: string,
	name: string
}

export type ISendNewUserUseCase = UseCase<In, Message>

/**
 * Use case responsável por enviar um email para um novo usuário com informações de ativação e boas-vindas.
 * @implements {ISendNewUserUseCase}
 */
@injectable()
@registry([{ token: SendNewUserUseCase, useClass: SendNewUserUseCase }])
export class SendNewUserUseCase implements ISendNewUserUseCase {

	/**
	 * Construtor da classe.
	 * @param sendActivation Use case responsável por enviar o email de ativação.
	 * @param sendWarning Use case responsável por enviar o email informando que um novo usuário foi criado.
	 */
	constructor(
		@inject(SendActivationNewUserUseCase) private readonly sendActivation: SendActivationNewUserUseCase,
		@inject(SendWarningNewUserUseCase) private readonly sendWarning: SendWarningNewUserUseCase,
	) { }

	/**
	 * Método responsável por executar o use case.
	 * @param email Email do novo usuário.
	 * @param id ID do novo usuário.
	 * @param name Nome do novo usuário.
	 * @returns Retorna uma mensagem de sucesso caso o email seja enviado com sucesso.
	 */
	async execute({ email, id, name }: In): PromiseEither<AbstractError, Message> {

		const promiseSendConfirm = this.sendActivation.execute({
			id: id.toString(),
			email: email,
			name: name as string,
		})

		const promiseSendNewAccount = this.sendWarning.execute({
			email: email,
		})

		await Promise.all([
			promiseSendConfirm,
			promiseSendNewAccount
		])

		return right({ message: 'Email enviado com sucesso' })
	}
}