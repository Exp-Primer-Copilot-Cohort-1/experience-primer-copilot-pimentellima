import { describe, expect, it } from 'vitest'
// Importações necessárias para o teste
import promiseErrorHandler, { PromiseError, PromiseSuccess } from './promise-err-handler'

// Funções auxiliares para criar Promises
function createResolvedPromise<T>(data: T): Promise<T> {
	return Promise.resolve(data)
}

function createRejectedPromise<T>(error: Error): Promise<T> {
	return Promise.reject(error)
}

describe('Function Promise Err Handler (Unit)', () => {
	it('should return PromiseSuccess when Promise resolves', async () => {
		const expectedData = 'Success'
		const resolvedPromise = createResolvedPromise(expectedData)

		const result = await promiseErrorHandler(resolvedPromise)

		expect(result).toEqual<PromiseSuccess<string>>([null, expectedData])
	})

	it('should return PromiseError when Promise rejects', async () => {
		const expectedError = new Error('Error')
		const rejectedPromise = createRejectedPromise<string>(expectedError)

		const result = await promiseErrorHandler(rejectedPromise)

		expect(result).toEqual<PromiseError>([expectedError, null])
	})
})
