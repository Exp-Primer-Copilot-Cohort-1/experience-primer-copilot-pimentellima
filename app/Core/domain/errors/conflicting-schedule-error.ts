import { AbstractError } from 'App/Core/errors/error.interface';

export class ConflictingScheduleError extends AbstractError {
	constructor() {
		super('Conflicting schedules', 409);
		this.name = 'ConflictingScheduleError';
	}
}
