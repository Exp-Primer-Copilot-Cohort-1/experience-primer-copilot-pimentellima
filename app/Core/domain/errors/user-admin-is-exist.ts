import { AbstractError, InterfaceError } from 'App/Core/errors/error.interface';

export class UserAdminIsExistError
	extends AbstractError
	implements InterfaceError {
	public readonly statusCode = 403;

	constructor() {
		super('User admin/admin-prof is exist.', 403);
		this.name = 'UserAdminIsExistError';
	}
}
