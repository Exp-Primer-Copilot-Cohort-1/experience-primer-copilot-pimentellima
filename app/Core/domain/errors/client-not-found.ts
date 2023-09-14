import { AbstractError } from 'App/Core/errors/error.interface'

export class ClientNotFoundError extends AbstractError {
	constructor(msg = 'Cliente não encontrado.') {
		super(msg, 404)
		this.name = 'ClientNotFoundError'
	}
}
