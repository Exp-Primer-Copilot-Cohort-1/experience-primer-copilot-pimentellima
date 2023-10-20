import { AbstractError } from 'App/Core/errors/error.interface'
import type { ValidationError } from 'class-validator'

export class ValidationAbstractError extends AbstractError {
	constructor(errors: ValidationError[]) {
		super('Erros de validação.', 400, new Error(errors.join('\n')))
		this.name = 'ValidationError'
	}
}