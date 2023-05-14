import { AbstractError } from 'App/Core/errors/error.interface';

export class AnswerNotFoundError extends AbstractError {
	constructor() {
		super('Answer not found.', 404);
		this.name = 'AnswerNotFoundError';
	}
}
