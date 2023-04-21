import { AbstractError } from 'App/Core/errors/error.interface';

export class MissingParamsError extends AbstractError {
	constructor(param: string) {
		super('Missing params: ' + param, 400);
		this.name = 'MissingParamsError';
	}
}
