import { AbstractError } from 'App/Core/errors/error.interface'

export class UnityIdNotProvidedError extends AbstractError {
	constructor() {
		super('O id da unidade não foi fornecido.', 400)
		this.name = 'UnityIdNotProvidedError'
	}
}
