import { AbstractError } from 'App/Core/errors/error.interface'

export class InvalidCredentialsError extends AbstractError {
	constructor(cause) {
		super('Invalid credentials.', 401, cause)
		this.name = 'InvalidCredentialsError'
	}
}
