import { AbstractError } from 'App/Core/errors/error.interface';
import { PromiseEither } from 'App/Core/shared/either';
import { SystemUser } from '../../entities/abstract/system-user.abstract';

export type ISession = {
	token: {
		token: string;
		type: 'bearer';
	};
	user: SystemUser;
};

export interface SessionManagerInterface {
	signIn: (
		email: string,
		password: string,
	) => PromiseEither<AbstractError, ISession>;
}
