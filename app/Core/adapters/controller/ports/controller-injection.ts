/* eslint-disable no-unused-vars */
import { HttpRequest } from 'App/Core/adapters/controller/ports/http'
import { err, ok } from 'App/Core/adapters/helpers/http-helper'
import { UseCase } from 'App/Core/interfaces/use-case.interface'

import { AbstractError } from 'App/Core/errors/error.interface'
import { IUser } from 'App/Types/IUser'
import { ControllerGeneric } from '../helpers/controller-generic'

import { OptsQuery } from 'App/Core/domain/entities/helpers/opts-query'
import container from 'App/Core/shared/container'
import { IOptsQuery } from 'App/Types/IOptsQuery'
import { InjectionToken } from 'tsyringe'

export class ControllerInjection implements ControllerGeneric {
	private constructor(
		private readonly UseCase: UseCase<any, unknown>
	) {
	} // eslint-disable-line

	static resolve(
		dep: InjectionToken<UseCase<any, unknown>>,
		query?: IOptsQuery,
	) {
		const opts = OptsQuery.build(query)
		container.registerInstance<OptsQuery>(OptsQuery, opts);
		const useCase = container.resolve(dep)
		return new ControllerInjection(useCase)
	}

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

export default ControllerInjection
