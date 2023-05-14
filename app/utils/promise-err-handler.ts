export type PromiseError<T> = [Error, null]
export type PromiseSuccess<T> = [null, T]
export type PromiseResult<T> = Promise<PromiseError<T> | PromiseSuccess<T>>

async function promiseErrorHandler<T>(promise): PromiseResult<T> {
	try {
		const data = await promise
		return [null, data]
	} catch (error) {
		return [error, null]
	}
}

export default promiseErrorHandler
