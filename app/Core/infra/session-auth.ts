import { AuthContract } from '@ioc:Adonis/Addons/Auth'

export interface ISessionAuth {
	signIn(email: string, password: string): Promise<any>
}

export class SessionAuth {
	private auth: AuthContract

	constructor(auth: any) {
		this.auth = auth
	}

	public async signIn(email: string, password: string) {
		return this.auth.use('api').attempt(email, password)
	}
}
