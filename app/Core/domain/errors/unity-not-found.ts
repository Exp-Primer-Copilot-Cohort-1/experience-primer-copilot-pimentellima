import { AbstractError } from 'App/Core/errors/error.interface'

export class UnityNotFoundError extends AbstractError {
	constructor() {
		super('Unidade não encontrada')
		this.name = 'UnityNotFoundError'
	}
}
