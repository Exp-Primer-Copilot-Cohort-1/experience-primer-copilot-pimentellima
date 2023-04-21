import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import { ControllerGeneric } from './controller/helpers';
import { colorize } from './controller/helpers/colorize';
import { HttpRequest } from './controller/ports/http';

export const adaptRoute = async (
	controller: ControllerGeneric,
	{ request, params, response }: HttpContextContract,
	customParams?: any,
) => {
	try {
		const httpRequest: HttpRequest = {
			body: { ...request.body(), ...customParams, ...params },
		};

		const { body, statusCode } = await controller.handle(httpRequest);

		if (process.env.NODE_ENV === 'development') {
			console.log(
				colorize(statusCode, request.url(), request.method() as any),
			);
		}

		return response.status(statusCode).json(body);
	} catch (error) {
		console.log(colorize(501, request.url(), request.method() as any));
	}
};
