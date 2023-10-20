import { AbstractError } from 'App/Core/errors/error.interface'

export class FormNotTypeProvider extends AbstractError {
	constructor() {
		super('O tipo do formulário não foi fornecido.', 400)
		this.name = 'FormNotTypeProvider'
	}
}
