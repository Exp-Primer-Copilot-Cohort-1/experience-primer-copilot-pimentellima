import { AbstractError } from 'App/Core/errors/error.interface'

export class PaymentParticipationsNotFoundError extends AbstractError {
	constructor() {
		super('PaymentParticipations not found.', 404)
		this.name = 'PaymentParticipationsNotFoundError'
	}
}
