import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { Model } from '@ioc:Mongoose';
import { ControllerInjection } from 'App/Core/adapters/controller';
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers';
import getterOptInRequest from 'App/Core/domain/entities/helpers/getter-opt-in-request';
import { CountsUseCase, FindAllUseCase, FindByIdUseCase } from 'App/Core/domain/use-cases';
import Collections, { COLLECTIONS_NAMES } from 'App/Models';
import { container } from 'tsyringe';

export const makeFindAll = (
	ctx: HttpContextContract,
	name: COLLECTIONS_NAMES
): ControllerGeneric => {
	const opts = getterOptInRequest(ctx)
	const model = Collections[name] as Model<any>
	container.registerInstance('Model', model)
	return ControllerInjection.resolve(FindAllUseCase, opts)
}

export const makeCounts = (
	ctx: HttpContextContract,
	name: COLLECTIONS_NAMES
): ControllerGeneric => {
	const opts = getterOptInRequest(ctx)
	const model = Collections[name] as Model<any>
	container.registerInstance('Model', model)
	return ControllerInjection.resolve(CountsUseCase, opts)
}

export const makeFindById = (
	ctx: HttpContextContract,
	name: COLLECTIONS_NAMES
): ControllerGeneric => {
	const opts = getterOptInRequest(ctx)
	const model = Collections[name] as Model<any>
	container.registerInstance('Model', model)
	return ControllerInjection.resolve(FindByIdUseCase, opts)
}