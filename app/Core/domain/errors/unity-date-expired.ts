import { AbstractError } from 'App/Core/errors/error.interface'

export class UnityDateExpiredError extends AbstractError {
	constructor() {
		super('Unidade com Data Expirada. Renove seu Plano!', 405)
		this.name = 'UnityDateExpiredError'
	}
}
