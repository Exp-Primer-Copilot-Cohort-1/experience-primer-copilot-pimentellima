import { AbstractError } from 'App/Core/errors/error.interface'

export class ClientNotSponsorError extends AbstractError {
	constructor() {
		super('Paciente menor de idade precisa possuir responsável.', 400)
		this.name = 'ClientNotSponsorError'
	}
}