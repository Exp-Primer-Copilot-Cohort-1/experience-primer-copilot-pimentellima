import { AbstractError } from 'App/Core/errors/error.interface'

export class UnityCreatedError extends AbstractError {
	constructor() {
		super('Não foi possível criar a unidade.', 401)
		this.name = 'UnityCreatedError'
	}
}
