import { AbstractError } from 'App/Core/errors/error.interface'

export class IdNotProvidedError extends AbstractError {
	constructor() {
		super('O id não foi fornecido.', 400)
		this.name = 'IdNotProvidedError'
	}
}
