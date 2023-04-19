import { ServerError } from 'App/Core/errors/server-error';

import { HttpResponse } from '../controller/ports/http';

export const badRequest = (error: Error): HttpResponse => ({
	statusCode: 400,
	body: error.message,
});

export const notFound = (error: Error): HttpResponse => ({
	statusCode: 404,
	body: error.message,
});

export const okNoBody = (): HttpResponse => ({
	statusCode: 200,
	body: {},
});

export const ok = (data: any): HttpResponse => ({
	statusCode: 200,
	body: data,
});

export const serverError = (reason: string): HttpResponse => ({
	statusCode: 500,
	body: new ServerError(reason),
});
