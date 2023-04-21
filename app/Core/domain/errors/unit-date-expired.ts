import { AbstractError } from 'App/Core/errors/error.interface';

export class UnitDateExpiredError extends AbstractError {
	constructor() {
		super('Unit date expired.', 400);
		this.name = 'UnitDateExpiredError';
	}
}
