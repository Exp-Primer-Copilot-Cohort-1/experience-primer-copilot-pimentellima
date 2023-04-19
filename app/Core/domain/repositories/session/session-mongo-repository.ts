import { AuthContract } from '@ioc:Adonis/Addons/Auth';
import promiseErrorHandler from 'App/Core/adapters/controller/helpers/promise-err-handler';
import { PromiseEither, left, right } from 'App/Core/shared/either';
import {
	ISession,
	SessionManagerInterface,
} from '../interface/session-manager.interface';

export class SessionRepository implements SessionManagerInterface {
	constructor(private readonly auth: AuthContract) { }

	public async signIn(
		email: string,
		password: string,
	): PromiseEither<Error, ISession> {
		const [err, userAuth] = await promiseErrorHandler(
			this.auth.use('api').attempt(email, password),
		);

		if (err) {
			return left(new Error('Invalid credentials'));
		}

		const user = userAuth.user;
		const token = {
			type: userAuth.type,
			token: userAuth.token,
		};

		return right({
			user,
			token,
		} as ISession);
	}
}
