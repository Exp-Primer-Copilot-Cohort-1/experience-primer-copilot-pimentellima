/* eslint-disable no-unused-vars */
import { HttpRequest } from 'App/Core/adapters/controller/ports/http'
import { err, ok } from 'App/Core/adapters/helpers/http-helper'
import { UseCase } from 'App/Core/interfaces/use-case.interface'

import { AbstractError } from 'App/Core/errors/error.interface'
import { IUser } from 'Types/IUser'
import { ControllerGeneric } from '../helpers/controller-generic'

export class Controller implements ControllerGeneric {
	constructor(private readonly UseCase: UseCase<any, unknown>) { } // eslint-disable-line

	public async handle(httpRequest: HttpRequest, user?: IUser) {
		try {
			const useCaseOrErr = await this.UseCase.execute(httpRequest.body, user)

			if (useCaseOrErr.isLeft()) {
				if (process.env.NODE_ENV !== 'production') {
					console.log('Controller: ', useCaseOrErr.extract())
				}
				return err(useCaseOrErr.extract())
			}

			return ok(useCaseOrErr.extract())
		} catch (error) {
			return err(new AbstractError(error.message, 500, error))
		}
	}
}

export default Controller
