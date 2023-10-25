import { CodeNotProvidedError, CodeNotValidError } from 'App/Core/domain/errors/code-not-provider.err'
import { UserAlreadyActiveError } from 'App/Core/domain/errors/user-already-active'
import { AdminMongooseRepository } from 'App/Core/domain/repositories'
import { AdminManagerContract } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { decrypt } from 'App/Helpers/encrypt'
import { IUser } from 'App/Types/IUser'
import { inject, injectable, registry } from 'tsyringe'

type In = {
	code: string
}


type DecryptedCode = Pick<IUser, '_id' | 'email'>
const decryptCode = async (code: string): PromiseEither<AbstractError, DecryptedCode> => {
	try {
		const user: DecryptedCode = JSON.parse(await decrypt(code))
		return right(user)
	} catch (err) {
		return left(new CodeNotValidError())
	}
}

@injectable()
@registry([{ token: ActivationUserUseCase, useClass: ActivationUserUseCase }])
export class ActivationUserUseCase implements UseCase<In, Message> {

	constructor(
		@inject(AdminMongooseRepository) private readonly manager: AdminManagerContract,
	) { }

	public async execute({
		code
	}: In): PromiseEither<AbstractError, Message> {

		if (!code) return left(new CodeNotProvidedError())

		const decryptOrErr = await decryptCode(code)

		if (decryptOrErr.isLeft()) return left(decryptOrErr.extract())

		const { email } = decryptOrErr.extract()

		const userOrErr = await this.manager.findByEmail(email)

		if (userOrErr.isLeft()) return left(userOrErr.extract())

		const user = userOrErr.extract()

		if (user.active) return left(new UserAlreadyActiveError())

		const userActivated = await this.manager.activation(user._id.toString())

		if (userActivated.isLeft()) return left(userActivated.extract())

		return right({ message: 'Usuário ativado com sucesso.' })
	}
}
