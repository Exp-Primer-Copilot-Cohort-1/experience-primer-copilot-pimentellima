import { InterfaceError } from 'App/Core/errors/error.interface';

export class UserAdminIsExistError extends Error implements InterfaceError {
	constructor() {
		super('User admin/admin-prof is exist.');
		this.name = 'UserAdminIsExistError';
	}
}
