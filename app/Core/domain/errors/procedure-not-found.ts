import { AbstractError } from 'App/Core/errors/error.interface'

export class ProcedureNotFoundError extends AbstractError {
	constructor(msg = 'Procedimento não Encontrado') {
		super(msg, 404)
		this.name = 'ProcedureNotFoundError'
	}
}
