import { AbstractError } from 'App/Core/errors/error.interface';

export class AccountNotFoundError extends AbstractError {
	constructor() {
		super('Account not found.', 404);
		this.name = 'AccountNotFoundError';
	}
}
