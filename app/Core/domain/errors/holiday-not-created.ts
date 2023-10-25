import { AbstractError } from 'App/Core/errors/error.interface'

export class HolidayNotCreatedError extends AbstractError {
	constructor() {
		super('Erro ao criar feriado', 400)
		this.name = 'HolidayNotCreatedError'
	}
}
