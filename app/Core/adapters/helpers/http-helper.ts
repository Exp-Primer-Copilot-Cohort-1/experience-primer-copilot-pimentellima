import { ServerError } from 'App/Core/errors/server-error'

import { AbstractError } from 'App/Core/errors/error.interface'
import { HttpResponse } from '../controller/ports/http'

export const err = (error: AbstractError): HttpResponse => ({
	statusCode: error.statusCode || 500,
	body: error.message,
})

export const notFound = (error: AbstractError): HttpResponse => ({
	statusCode: 404,
	body: error.message,
})

export const okNoBody = (): HttpResponse => ({
	statusCode: 200,
	body: {},
})

export const ok = (data: any): HttpResponse => ({
	statusCode: 200,
	body: data,
})

export const serverError = (reason: string): HttpResponse => ({
	statusCode: 500,
	body: new ServerError(reason),
})
