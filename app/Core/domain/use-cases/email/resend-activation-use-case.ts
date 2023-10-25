import { IdNotProvidedError } from "App/Core/domain/errors/id-not-provided";
import { AdminMongooseRepository } from "App/Core/domain/repositories";
import { AdminManagerContract } from "App/Core/domain/repositories/interface";
import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import { inject, injectable, registry } from 'tsyringe';
import { UserAlreadyActiveError } from "../../errors/user-already-active";
import { CreatePasswordUseCase } from "../auth/sign-up";
import { ICreatePasswordUseCase } from "../auth/sign-up/type";
import { SendActivationNewUserUseCase } from './send-activation-new-user-use-case';

type In = {
	id: string
}

export type IResendActivation = UseCase<In, Message>

/**
 * Use case responsável por re-enviar os email para um novo usuário com informações de ativação e nova senha.
 * @implements {IResendActivation}
 */
@injectable()
@registry([{ token: ResendActivationUseCase, useClass: ResendActivationUseCase }])
export class ResendActivationUseCase implements IResendActivation {

	/**
	 * Construtor da classe.
	 * @param sendActivation Use case responsável por enviar o email de ativação.
	 * @param createPassword Use case responsável por criar uma senha para o novo usuário.
	 * @param manager Repositório responsável por gerenciar os dados do usuário.
	 */
	constructor(
		@inject(SendActivationNewUserUseCase) private readonly sendActivation: SendActivationNewUserUseCase,
		@inject(CreatePasswordUseCase) private readonly createPassword: ICreatePasswordUseCase,
		@inject(AdminMongooseRepository) private readonly manager: AdminManagerContract,
	) { }

	/**
	 * Método responsável por executar o use case.
	 * @param id ID do novo usuário.
	 * @returns Retorna uma mensagem de sucesso caso o email seja enviado com sucesso.
	 */
	async execute({ id }: In): PromiseEither<AbstractError, Message> {
		if (!id) return left(new IdNotProvidedError())

		const userOrErr = await this.manager.findById(id)

		if (userOrErr.isLeft()) return left(userOrErr.extract())

		const user = userOrErr.extract()

		const { email, name, active } = user

		if (active) return left(new UserAlreadyActiveError())

		const promiseCreatePassword = this.createPassword.execute(
			{ email: email as string }
		)

		const promiseSendConfirm = this.sendActivation.execute({
			id: id.toString(),
			email: email as string,
			name: name as string,
		})

		await Promise.all([promiseCreatePassword, promiseSendConfirm])

		return right({ message: 'Email enviado com sucesso' })
	}
}