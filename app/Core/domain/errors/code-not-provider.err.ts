import { AbstractError } from 'App/Core/errors/error.interface'

export class CodeNotProvidedError extends AbstractError {
	constructor() {
		super('O code não foi fornecido.', 400)
		this.name = 'CodeNotProvidedError'
	}
}

export class CodeNotValidError extends AbstractError {
	constructor() {
		super('O código não é válido.', 400)
		this.name = 'CodeNotValidError'
	}
}