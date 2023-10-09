import { AbstractError } from 'App/Core/errors/error.interface'

export class ProfNotIdProvidedError extends AbstractError {
	constructor() {
		super('O id do profissional não foi fornecido.', 400)
		this.name = 'ProfIdNotProvidedError'
	}
}
