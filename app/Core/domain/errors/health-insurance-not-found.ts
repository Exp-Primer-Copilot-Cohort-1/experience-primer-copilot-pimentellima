import { AbstractError } from 'App/Core/errors/error.interface'

export class HealthInsuranceNotFoundError extends AbstractError {
	constructor() {
		super('HealthInsurance not found.', 404)
		this.name = 'HealthInsuranceNotFoundError'
	}
}
