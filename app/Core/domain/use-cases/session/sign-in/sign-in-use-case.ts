import {
	ISession,
	SessionManagerInterface,
	UnitiesManagerInterface,
} from 'App/Core/domain/repositories/interface';
import { UseCase } from 'App/Core/interfaces/use-case.interface';
import { PromiseEither, left, right } from 'App/Core/shared/either';
import { IUnity } from 'Types/IUnity';
import { Credentials } from '../../helpers/credentials';

export class SignInUseCase
	implements UseCase<Credentials, undefined, ISession>
{
	constructor(
		private readonly sessionManager: SessionManagerInterface,
		private readonly unittiesManager: UnitiesManagerInterface,
		private readonly unityValidationUseCase: UseCase<
			IUnity,
			undefined,
			boolean
		>,
	) { }

	public async execute({
		email,
		password,
	}: Credentials): PromiseEither<Error, ISession> {
		const sessionOrErr = await this.sessionManager.signIn(email, password);

		if (sessionOrErr.isLeft()) {
			return left(sessionOrErr.extract());
		}

		const session = sessionOrErr.extract();

		const unity = await this.unittiesManager.findById(
			session.user.unity_id.toString(),
		);

		if (unity.isLeft()) {
			return left(unity.extract());
		}

		const isValid = await this.unityValidationUseCase.execute(
			unity.extract(),
		);

		if (isValid.isLeft()) {
			return left(isValid.extract());
		}

		return right(session);
	}
}
