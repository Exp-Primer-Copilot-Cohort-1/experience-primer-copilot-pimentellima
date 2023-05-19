import { Exception } from '@adonisjs/core/build/standalone'

export class UnityAlreadyExistException extends Exception {
	constructor() {
		super('Unidade já existe.', 409)
	}
}
