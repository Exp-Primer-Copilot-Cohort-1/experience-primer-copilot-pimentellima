import { AbstractError } from 'App/Core/errors/error.interface';

export class UnitNotFoundError extends AbstractError {
	constructor() {
		super('Unit not found.', 404);
		this.name = 'UnitNotFoundError';
	}
}
