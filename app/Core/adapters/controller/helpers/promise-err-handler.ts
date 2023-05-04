export type PromiseError = [Error, null]
export type PromiseSuccess<T> = [null, T]
export type PromiseResult<T> = Promise<PromiseError | PromiseSuccess<T>>

async function promiseErrorHandler<T>(promise: Promise<T>): PromiseResult<T> {
	try {
		const data = await promise

		return [null, data]
	} catch (error) {
		return [error, null]
	}
}

export default promiseErrorHandler
