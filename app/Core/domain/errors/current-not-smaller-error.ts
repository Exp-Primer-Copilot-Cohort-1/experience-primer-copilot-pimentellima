import { AbstractError } from 'App/Core/errors/error.interface';

export class CurrentNotSmallerError extends AbstractError {
	constructor() {
		super('A resposta atual não pode ser menor que a anterior', 409);
		this.name = 'CurrentNotSmallerError';
	}
}
