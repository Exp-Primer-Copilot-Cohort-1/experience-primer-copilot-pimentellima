import { AbstractError } from 'App/Core/errors/error.interface'

export class SendEmailError extends AbstractError {
	constructor(cause?: Error) {
		super('Erro ao enviar email', 500, cause)
		this.name = 'SendEmailError'
	}
}
