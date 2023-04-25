import { AbstractError } from 'App/Core/errors/error.interface'

export class ParamsNotPassedError extends AbstractError {
	constructor() {
		super('Missing params', 400)
		this.name = 'ParamsNotPassedError'
	}
}
