import { AbstractError } from 'App/Core/errors/error.interface';

export class ActivityNotFoundError extends AbstractError {
	constructor() {
		super('Activity not found.', 404);
		this.name = 'ActivityNotFoundError';
	}
}
