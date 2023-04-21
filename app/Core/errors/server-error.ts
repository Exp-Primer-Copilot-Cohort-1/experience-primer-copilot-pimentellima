import { AbstractError } from './error.interface';

export class ServerError extends AbstractError {
	constructor(reason: string, public readonly statusCode: number = 500) {
		super('Server error: ' + reason + '.', statusCode);
		this.name = 'ServerError';
	}
}
