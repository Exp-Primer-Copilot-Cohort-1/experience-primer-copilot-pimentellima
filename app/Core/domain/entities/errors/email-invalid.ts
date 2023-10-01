import { AbstractError } from 'App/Core/errors/error.interface'

export class EmailInvalidError extends AbstractError {
	constructor() {
		super('Email inválido.', 400)
		this.name = 'EmailInvalidError'
	}
}