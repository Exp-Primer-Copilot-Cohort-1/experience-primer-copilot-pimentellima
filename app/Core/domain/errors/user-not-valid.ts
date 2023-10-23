import { AbstractError, ContractError } from 'App/Core/errors/error.interface';

export class UserNotValidError extends AbstractError implements ContractError {
	public readonly statusCode = 403;

	constructor(cause) {
		super('User not valid. Entity is not valid.', 403, cause);
		this.name = 'UserNotValidError';
	}
}
