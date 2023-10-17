import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import { injectable, registry } from 'tsyringe'
import { UserNotActiveError } from '../domain/errors'
import { left } from '../shared'

export interface ISessionAuth {
	signIn(email: string, password: string): Promise<any>
}

@injectable()
@registry([{ token: SessionAuth, useClass: SessionAuth }])
export class SessionAuth {
	private auth: AuthContract

	constructor(auth: any) {
		this.auth = auth
	}

	public async signIn(email: string, password: string) {
		const session = await this.auth.use('api').attempt(email, password)

		if (!session.user.active) {
			this.auth.use('api').logout()
			return left(new UserNotActiveError())
		}

		return session
	}
}
