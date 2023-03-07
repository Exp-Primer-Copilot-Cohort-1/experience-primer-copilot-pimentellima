import { Exception } from '@adonisjs/core/build/standalone';

export class UnityNotFoundException extends Exception {
    constructor() {
        super('Unidade não encontrada.', 404);
    }
}