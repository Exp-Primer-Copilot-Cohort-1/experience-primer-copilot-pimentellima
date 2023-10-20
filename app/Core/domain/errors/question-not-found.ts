import { AbstractError } from 'App/Core/errors/error.interface'

export class QuestionNotFound extends AbstractError {
	constructor() {
		super('Questão não encontrada.', 404)
		this.name = 'QuestionNotFound'
	}
}
