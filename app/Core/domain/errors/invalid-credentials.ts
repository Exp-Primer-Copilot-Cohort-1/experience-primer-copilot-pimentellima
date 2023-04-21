import { AbstractError } from 'App/Core/errors/error.interface';

export class InvalidCredentialsError extends AbstractError {
	constructor() {
		super('Invalid credentials.', 401);
		this.name = 'InvalidCredentialsError';
	}
}
