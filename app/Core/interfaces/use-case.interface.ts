import { PromiseEither } from 'App/Core/shared/either';

export interface UseCase<T = unknown, P = unknown, U = unknown> {
	execute: (body?: T, params?: P) => PromiseEither<Error, U>;
}
