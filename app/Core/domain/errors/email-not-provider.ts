import { AbstractError } from 'App/Core/errors/error.interface'

export class EmailNotProvidedError extends AbstractError {
	constructor() {
		super('O email não foi fornecido.', 400)
		this.name = 'EmailNotProvidedError'
	}
}
