import { PromiseEither } from 'App/Core/shared/either';
import { AbstractError } from '../errors/error.interface';

export interface UseCase<T, U> {
	execute: (body?: T) => PromiseEither<AbstractError, U>;
}
