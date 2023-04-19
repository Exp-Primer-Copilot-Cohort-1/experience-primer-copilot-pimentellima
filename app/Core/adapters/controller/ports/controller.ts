/* eslint-disable no-unused-vars */
import { HttpRequest } from 'App/Core/adapters/controller/ports/http';
import {
	badRequest,
	ok,
	serverError,
} from 'App/Core/adapters/helpers/http-helper';
import { UseCase } from 'App/Core/interfaces/use-case.interface';
import promiseErrorHandler from '../helpers/promise-err-handler';

import { ControllerGeneric } from '../helpers/controller-generic';

export class Controller implements ControllerGeneric {
	constructor(private readonly UseCase: UseCase<any, any, any>) { }

	public async handle(httpRequest: HttpRequest) {
		const [err, resOrErr] = await promiseErrorHandler(
			this.UseCase.execute(httpRequest.body, httpRequest.params ?? {}),
		);

		if (err) {
			return serverError(err.message);
		}

		if (resOrErr.isLeft()) {
			return badRequest(resOrErr.extract());
		}

		return ok(resOrErr.extract());
	}
}

export default Controller;
