import { AbstractError } from 'App/Core/errors/error.interface'

export class NotificationNotIsRequired extends AbstractError {
	constructor() {
		super('Notificação não é necessária.', 400)
		this.name = 'NotificationNotIsRequired'
	}
}
