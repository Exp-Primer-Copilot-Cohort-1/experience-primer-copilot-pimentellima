import { AbstractError } from 'App/Core/errors/error.interface'

export class UnityNotFoundError extends AbstractError {
	constructor() {
		super('Unit not found.', 404)
		this.name = 'UnityNotFoundError'
	}
}
