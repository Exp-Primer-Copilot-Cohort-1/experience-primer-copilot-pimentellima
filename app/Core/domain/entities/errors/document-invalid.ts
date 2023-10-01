import { AbstractError } from 'App/Core/errors/error.interface'

export class DocumentInvalidError extends AbstractError {
	constructor() {
		super('CPF ou CNPJ inválido.', 400)
		this.name = 'DocumentInvalidError'
	}
}