import User from 'App/Core/domain/entities/user/user';
import { PromiseEither } from 'App/Core/shared/either';

export type ISession = {
	token: {
		token: string;
		expires: string;
		type: 'bearer';
	};
	user: User;
};

export interface SessionManagerInterface {
	signIn: (email: string, password: string) => PromiseEither<Error, ISession>;
}
