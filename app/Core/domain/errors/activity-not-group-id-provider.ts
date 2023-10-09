import { AbstractError } from 'App/Core/errors/error.interface'

export class ActivityNotGroupIdProvider extends AbstractError {
	constructor() {
		super('O id do grupo não foi fornecido para a atividade recorrente.', 400)
		this.name = 'ActivityNotGroupIdProvider'
	}
}
