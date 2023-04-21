import { AbstractError } from 'App/Core/errors/error.interface';

type ErrorPromise = [AbstractError, null];
type SuccessPromise<T> = [null, T];
type Response<T> = ErrorPromise | SuccessPromise<T>;

async function promiseErrorHandler<T>(
	promise: Promise<T>,
): Promise<Response<T>> {
	try {
		const data = await promise;

		return [null, data];
	} catch (error) {
		return [error, null];
	}
}

export default promiseErrorHandler;
