import { Exception } from '@adonisjs/core/build/standalone';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export class InvalidDocumentException extends Exception {
	constructor() {
		super('Documento inválido.', 400);
	}

	public async handle(error: this, { response }: HttpContextContract) {
		response.status(error.status).send({
			error: {
				message: error.message,
			},
		});
	}

	public static invoke(): string {
		return new InvalidDocumentException().message;
	}
}
