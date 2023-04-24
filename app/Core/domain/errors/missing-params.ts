import { AbstractError } from 'App/Core/errors/error.interface'

export class MissingParamsError extends AbstractError {
	private params: string[] = []

	constructor(param?: string) {
		const message = param ? param : ''
		super('Missing params: ' + message, 400)
		this.name = 'MissingParamsError'
	}

	addParam(param, value): MissingParamsError {
		if (!value) {
			this.params.push(param)
			this.message = 'Missing params: ' + this.params.join(', ')
		}

		return this
	}
}
