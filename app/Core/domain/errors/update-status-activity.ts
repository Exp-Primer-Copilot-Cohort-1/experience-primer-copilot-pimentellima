import { AbstractError } from 'App/Core/errors/error.interface'

export class UpdateStatusActivityError extends AbstractError {
	constructor() {
		super('Não foi possível atualizar o status da atividade.', 400)
		this.name = 'UpdateStatusActivityError'
	}
}
