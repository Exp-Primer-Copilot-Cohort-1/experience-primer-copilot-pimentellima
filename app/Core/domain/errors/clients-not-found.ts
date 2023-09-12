import { AbstractError } from 'App/Core/errors/error.interface'

export class ClientNotFoundError extends AbstractError {
	constructor() {
		super('Client not found.', 404)
		this.name = 'ClientNotFoundError'
	}
}
