import { UnitiesMongooseRepository } from 'App/Core/domain/repositories'
import {
	ISession,
	SessionManagerInterface,
	UnitiesManagerInterface,
} from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared/either'
import { IUnity } from 'App/Types/IUnity'
import { inject, injectable, registry } from 'tsyringe'
import { Credentials } from '../../helpers/credentials'
import { UnityValidationUseCase } from '../../validations'

@injectable()
@registry([{ token: SignInUseCase, useClass: SignInUseCase }])
export class SignInUseCase implements UseCase<Credentials, ISession> {
	constructor(
		@inject('SessionRepository') private readonly sessionManager: SessionManagerInterface,
		@inject(UnitiesMongooseRepository) private readonly unitiesManager: UnitiesManagerInterface,
		@inject(UnityValidationUseCase) private readonly unityValidationUseCase: UseCase<IUnity, IUnity>,
	) { } // eslint-disable-line

	public async execute({
		email,
		password,
	}: Credentials): PromiseEither<AbstractError, ISession> {
		const sessionOrErr = await this.sessionManager.signIn(email, password)

		if (sessionOrErr.isLeft()) return left(sessionOrErr.extract())

		const session = sessionOrErr.extract()

		const unity = await this.unitiesManager.findById(session.user.unity_id.toString())

		if (unity.isLeft()) return left(unity.extract())

		const isValid = await this.unityValidationUseCase.execute(unity.extract())

		if (isValid.isLeft()) return left(isValid.extract())

		return right(session)
	}
}
