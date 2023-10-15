import { Model } from '@ioc:Mongoose';
import { ControllerInjection } from 'App/Core/adapters/controller';
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers';
import { CountsUseCase } from 'App/Core/domain/use-cases';
import Collections, { COLLECTIONS_NAMES } from 'App/Models';
import { IOptsQuery } from 'App/Types/IOptsQuery';
import { container } from 'tsyringe';


const make = (opts: IOptsQuery, model: Model<any>): ControllerGeneric => {
	container.registerInstance('Model', model)
	return ControllerInjection.resolve(CountsUseCase, opts)
}

export const makeCounts = (
	opts: IOptsQuery,
	name: COLLECTIONS_NAMES
): ControllerGeneric => {
	const model = Collections[name]
	return make(opts, model)
}