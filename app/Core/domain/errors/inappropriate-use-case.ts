import { AbstractError } from 'App/Core/errors/error.interface'

export class InappropriateUseCase extends AbstractError {
	constructor() {
		super('Este caso de uso não pode ser utilizado.', 400)
		this.name = 'InappropriateUseCase'
	}
}
