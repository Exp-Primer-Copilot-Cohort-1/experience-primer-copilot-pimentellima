import { AbstractError } from 'App/Core/errors/error.interface'

export class UserAlreadyActiveError extends AbstractError {
	constructor() {
		super('Usuário já está ativado.', 401)
		this.name = 'UserAlreadyActiveError'
	}
}
