import { AbstractError } from 'App/Core/errors/error.interface'

// Usuário não Ativadp
export class UserNotActiveError extends AbstractError {
	constructor() {
		super('Usuário não está ativado.', 403)
		this.name = 'UserNotActiveError'
	}
}
