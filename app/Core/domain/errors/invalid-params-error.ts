import { AbstractError } from 'App/Core/errors/error.interface'

export class InvalidParamsError extends AbstractError {
	constructor(cause?: Error) {
		super('Invalid params' + cause?.message, 400, cause)
		this.name = 'InvalidParamsError'
	}
}
