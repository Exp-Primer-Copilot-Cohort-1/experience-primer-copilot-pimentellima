import { AbstractError, InterfaceError } from 'App/Core/errors/error.interface';

export class UserNotValidError extends AbstractError implements InterfaceError {
	public readonly statusCode = 403;

	constructor(cause) {
		super('User not valid. Entity is not valid.', 403, cause);
		this.name = 'UserNotValidError';
	}
}
