import { PromiseEither } from 'App/Core/shared/either';
import { AbstractError } from '../errors/error.interface';

export interface UseCase<T = unknown, P = unknown, U = unknown> {
	execute: (body?: T, params?: P) => PromiseEither<AbstractError, U>;
}
