import { PromiseEither } from 'App/Core/shared/either';
import { IUser } from 'Types/IUser';

export type ISession = {
	token: {
		token: string;
		expires: string;
		type: 'bearer';
	};
	user: IUser;
};

export interface SessionManagerInterface {
	signIn: (email: string, password: string) => PromiseEither<Error, ISession>;
}
