import { Exception } from '@adonisjs/core/build/standalone';

export class UserNotFoundException extends Exception {
    constructor() {
        super('Usuário não encontrada.', 404);
    }
}