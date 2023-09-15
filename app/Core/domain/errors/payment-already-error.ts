import { AbstractError } from 'App/Core/errors/error.interface'

export class PaymentAlreadyError extends AbstractError {
	constructor() {
		super('Pagamento já realizado', 400)
		this.name = 'PaymentAlreadyError'
	}
}
