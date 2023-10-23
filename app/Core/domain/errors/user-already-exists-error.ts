import { AbstractError, ContractError } from 'App/Core/errors/error.interface';

export class UserAlreadyExistsError
	extends AbstractError
	implements ContractError {
	public readonly statusCode = 401;

	constructor() {
		super('Email de usuário já cadastrado', 401);
		this.name = 'UserAlreadyExistsError';
	}
}
