import { AbstractError, ContractError } from 'App/Core/errors/error.interface';

export class UserAdminIsExistError
	extends AbstractError
	implements ContractError {
	public readonly statusCode = 403;

	constructor() {
		super('User admin/admin-prof is exist.', 403);
		this.name = 'UserAdminIsExistError';
	}
}
