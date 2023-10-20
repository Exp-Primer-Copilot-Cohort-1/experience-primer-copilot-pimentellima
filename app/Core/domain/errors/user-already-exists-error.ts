import { AbstractError, InterfaceError } from 'App/Core/errors/error.interface';

export class UserAlreadyExistsError
	extends AbstractError
	implements InterfaceError {
	public readonly statusCode = 401;

	constructor() {
		super('Email de usuário já cadastrado', 401);
		this.name = 'UserAlreadyExistsError';
	}
}
