import { AbstractError } from 'App/Core/errors/error.interface'

export class BirthDateInvalidError extends AbstractError {
	constructor() {
		super('Data de nascimento inválida.', 400)
		this.name = 'BirthDateInvalidError'
	}
}

export class BirthDateInvalidRangeError extends AbstractError {
	constructor() {
		super('Data de nascimento fora do intervalo permitido.', 400)
		this.name = 'BirthDateInvalidRangeError'
	}
}