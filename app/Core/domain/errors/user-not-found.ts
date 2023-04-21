import { AbstractError } from 'App/Core/errors/error.interface';

export class UserNotFoundError extends AbstractError {
	constructor() {
		super('User not found.', 404);
		this.name = 'UserNotFoundError';
	}
}
