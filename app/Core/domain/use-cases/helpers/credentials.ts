import { IUser } from "App/Types/IUser";

export type Credentials = {
	email: string;
	password: string;
};

export type ISessionToken = {
	user: IUser
	token: string
	expiresIn: number
	type: 'bearer'
}
