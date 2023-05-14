import { AbstractError } from 'App/Core/errors/error.interface';

export class FormNotFoundError extends AbstractError {
	constructor() {
		super('Form not found.', 404);
		this.name = 'FormNotFoundError';
	}
}
