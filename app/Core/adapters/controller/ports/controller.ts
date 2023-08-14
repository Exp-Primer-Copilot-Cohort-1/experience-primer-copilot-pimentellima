/* eslint-disable no-unused-vars */
import { HttpRequest } from 'App/Core/adapters/controller/ports/http'
import { err, ok } from 'App/Core/adapters/helpers/http-helper'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import promiseErrorHandler from '../helpers/promise-err-handler'

import { AbstractError } from 'App/Core/errors/error.interface'
import { IUser } from 'Types/IUser'
import { ControllerGeneric } from '../helpers/controller-generic'

export class Controller implements ControllerGeneric {
	constructor(private readonly UseCase: UseCase<any, any>) { }

	public async handle(httpRequest: HttpRequest, user?: IUser) {
		const [error, resOrErr] = await promiseErrorHandler(
			this.UseCase.execute(httpRequest.body, user),
		)

		if (error) {
			if (process.env.NODE_ENV !== 'production') {
				console.log('Controller: ', error)
			}
			return err(new AbstractError(error.message, 500, error))
		}

		if (resOrErr.isLeft()) {
			if (process.env.NODE_ENV !== 'production') {
				console.log(resOrErr.extract())
			}

			return err(resOrErr.extract())
		}

		return ok(resOrErr.extract())
	}
}

export default Controller
