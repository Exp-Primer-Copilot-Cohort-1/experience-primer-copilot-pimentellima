import { Exception } from '@adonisjs/core/build/standalone';

export class UserAlreadyExistsException extends Exception {
    constructor() {
        super('Usuário já cadastrado.', 409);
    }
}