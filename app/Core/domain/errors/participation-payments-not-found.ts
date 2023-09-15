import { AbstractError } from 'App/Core/errors/error.interface'

export class ParticipationPaymentsNotFoundError extends AbstractError {
	constructor(msg = 'Participação não encontrado.') {
		super(msg, 404)
		this.name = 'ParticipationPaymentsNotFoundError'
	}
}
