import { AbstractError } from 'App/Core/errors/error.interface'

export class NameInvalidError extends AbstractError {
	constructor() {
		super('Nome inválido.', 400)
		this.name = 'NameInvalidError'
	}
}