import { AbstractError } from 'App/Core/errors/error.interface';

export class InvalidScheduleError extends AbstractError {
	constructor() {
		super('Invalid schedule', 409);
		this.name = 'InvalidScheduleError';
	}
}
